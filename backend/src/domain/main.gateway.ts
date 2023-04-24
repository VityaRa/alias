import { BadRequestException, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room/room.service';
import { UserService } from './user/user.service';
import { ChangeActiveUserDto, ChangeTeamDto, ChangeThemeDto, JoinRoomDto, NextWordDto, StartGameDto } from 'src/dto/room';
import {
  CreateRoomDto,
  CreateUserDto,
  GetUserDto,
  UserStatus,
} from 'src/dto/user';
import { TeamService } from './team/team.service';
import { ERRORS } from './errors/codes';
import { IncomingMessages, SentMessages } from './events/events';
import { ThemeService } from './theme/theme.service';
import { Cron } from '@nestjs/schedule';

interface TimeoutsMap {
  [roomId: string]: NodeJS.Timeout;
}

@WebSocketGateway({ cors: true })
export class MainGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  timeouts: TimeoutsMap;
  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private teamService: TeamService,
    private themeService: ThemeService,
  ) {
    this.timeouts = {};
  }
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  /**
   *
   * @param client socket
   * @param data CreateUserDto
   * @description Create user by his username
   */
  @SubscribeMessage(IncomingMessages.LOGIN)
  handleLogin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateUserDto,
  ): void {
    this.logger.log(`${IncomingMessages.LOGIN}:`, data);
    const user = this.userService.create({
      name: data.name,
      socketId: client.id,
    });
    client.emit(SentMessages.LOGIN, {
      user,
    });
  }

  /**
   *
   * @param client socket
   * @param data CreateRoomDto
   * @description Create room for user if he didn't join yet
   */
  @SubscribeMessage(IncomingMessages.GET_OR_CREATE_ROOM)
  handleGetOrCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateRoomDto,
  ) {
    const user = this.userService.get(data.userId);
    const room = this.roomService.createOrGet(user, data.roomSlug);
    const withJoinRoom = this.roomService.join({
      linkSlug: room.linkSlug,
      userId: user.id,
    });
    const roomDto = this.roomService.toDto(withJoinRoom || room);
    const notifyIds = this.roomService.getUsersToNotify(roomDto);
    [...notifyIds, client.id].forEach((id) => {
      this.server
        .to(id)
        .emit(SentMessages.GET_OR_CREATE_ROOM, { room: roomDto });
    });
  }

  /**
   *
   * @param client socket
   * @param data GetUserDto
   * @description Get exist user by id and update socketId
   */
  @SubscribeMessage(IncomingMessages.GET)
  handleGetUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: GetUserDto,
  ): void {
    this.logger.log(`${IncomingMessages.GET}:`, data);
    try {
      const user = this.userService.getAndUpdate(data.userId, client.id);
      if (user.status === UserStatus.DISCONNECTED) {
        this.userService.changeStatus(user.id, UserStatus.READY);
      }
      client.emit(SentMessages.GET, {
        user,
      });
    } catch (e) {
      if (e.message === ERRORS.NUI) {
        return;
      }
      client.emit(SentMessages.GET, {
        error: e.message,
      });
    }
  }

  @SubscribeMessage(IncomingMessages.JOIN)
  handleJoin(client: Socket, data: JoinRoomDto) {
    this.logger.log(`${IncomingMessages.JOIN}:`, data);
    const room = this.roomService.join(data);
    const roomDto = this.roomService.toDto(room);
    const notifyIds = this.roomService.getUsersToNotify(roomDto);
    notifyIds.forEach((id) => {
      this.server.to(id).emit(SentMessages.JOIN, { newRoom: roomDto });
    });
    client.emit(SentMessages.JOIN, {
      room,
    });
  }

  @SubscribeMessage(IncomingMessages.TEAM_CHANGE)
  handleTeamChange(client: Socket, data: ChangeTeamDto) {
    this.logger.log(`${IncomingMessages.TEAM_CHANGE}: ${data}`);
    const room = this.roomService.get(data.roomId);
    if (!room) {
      throw new BadRequestException('Комнаты не существует');
    }
    this.teamService.move(room.teamsGroup, data.userId, data.teamId);
    const newRoom = this.roomService.get(data.roomId);
    const roomDto = this.roomService.toDto(newRoom);
    const notifyIds = this.roomService.getUsersToNotify(roomDto);
    notifyIds.forEach((id) => {
      this.server.to(id).emit(SentMessages.TEAM_CHANGE, { newRoom: roomDto });
    });
  }

  @SubscribeMessage(IncomingMessages.THEME_CHANGE)
  handleThemeChange(client: Socket, data: ChangeThemeDto) {
    this.logger.log(`${IncomingMessages.THEME_CHANGE}: ${data}`);
    const user = this.userService.getBySocketId(client.id);
    const room = this.roomService.getFromLink(data.linkSlug);
    const isOwner = this.roomService.checkIsOwner(room, user.id);
    if (!isOwner) {
      client.emit(SentMessages.THEME_CHANGE, {
        error: 'non_owner',
      });
      return;
    }

    const newRoom = this.roomService.changeTheme(room, data.themeId);
    const roomDto = this.roomService.toDto(newRoom);
    const notifyIds = this.roomService.getUsersToNotify(roomDto);
    notifyIds.forEach((id) => {
      this.server.to(id).emit(SentMessages.THEME_CHANGE, { newThemeId: newRoom.selectedThemeId });
    });
  }

  @SubscribeMessage(IncomingMessages.START_GAME)
  handleGameStart(client: Socket, data: StartGameDto) {
    this.logger.log(`${IncomingMessages.START_GAME}: ${data}`);
    const user = this.userService.getBySocketId(client.id);
    const room = this.roomService.getFromLink(data.linkSlug);
    const isOwner = this.roomService.checkIsOwner(room, user.id);
    if (!isOwner) {
      client.emit(SentMessages.START_GAME, {
        error: 'Нет прав',
      });
      return;
    }

    const canStart = this.roomService.canStart(room);
    if (!canStart) {
      client.emit(SentMessages.START_GAME, {
        error: 'Недостаточно игроков или не выбран активный игрок',
      });
      return;
    }
    const newRoom = this.roomService.startGame(room);
    const remainTime = this.roomService.getRemainTime(room);
    const nextWord = this.themeService.getNext(room.selectedThemeId, room.words)
    room.words.push(nextWord.id);
    const roomDto = this.roomService.toDto(newRoom);
    const notifyIds = this.roomService.getUsersToNotify(roomDto);
    notifyIds.forEach((id) => {
      this.server.to(id).emit(SentMessages.START_GAME, { ...roomDto, started: true, remainTime });
    });

    this.addTimeout(room.id);
  }

  @SubscribeMessage(IncomingMessages.NEXT_WORD)
  handleNextWordStart(client: Socket, data: NextWordDto) {
    const user = this.userService.getBySocketId(client.id);
    if (user.status !== UserStatus.ACTIVE) {
      return;
    }
    const room = this.roomService.getFromLink(data.linkSlug);
    const nextWord = this.themeService.getNext(room.selectedThemeId, room.words);

    if (!nextWord?.id) {
      return;
    }
    room.words.push(nextWord.id)
    const roomDto = this.roomService.toDto(room);

    const notifyIds = this.roomService.getUsersToNotify(roomDto);
    notifyIds.forEach((id) => {
      this.server.to(id).emit(SentMessages.NEXT_WORD, { nextWord });
    });
  }

  @SubscribeMessage(IncomingMessages.CHANGED_ACTIVE_USER)
  handleChangeActiveUser(client: Socket, data: ChangeActiveUserDto) {
    const user = this.userService.getBySocketId(client.id);
    const room = this.roomService.getFromLink(data.linkSlug);
    const isOwner = this.roomService.checkIsOwner(room, user.id);
    if (!isOwner) {
      client.emit(SentMessages.START_GAME, {
        error: 'Нет прав',
      });
      return;
    }
    if (room.started) {
      return;
    }
    const { socketId } = this.roomService.changeActiveUser(room, data.activeUserId);
    const roomDto = this.roomService.toDto(room);
    const teamsGroup = roomDto.teamsGroup;
    const notifyIds = this.roomService.getUsersToNotify(roomDto);
    notifyIds.forEach((id) => {
      this.server.to(id).emit(SentMessages.CHANGED_ACTIVE_USER, { teamsGroup, status: socketId === id ? UserStatus.ACTIVE : UserStatus.READY });
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    try {
      const user = this.userService.getBySocketId(client.id);
      if (user) {
        this.userService.changeStatus(user.id, UserStatus.DISCONNECTED);
      }
    } catch (e) {}
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  private addTimeout(roomId: string) {
    const timeout = setTimeout(() => {
      const roomModel = this.roomService.get(roomId);
      const finishedRoom = this.roomService.endGame(roomModel);
      const roomDto =  this.roomService.toDto(finishedRoom);;
      const notifyIds = this.roomService.getUsersToNotify(roomDto);
      notifyIds.forEach((id) => {
        this.server.to(id).emit(SentMessages.END_GAME, { started: false, remainTime: 0 });
      });
    }, 60 * 1000);

    this.timeouts[roomId] = timeout;
  }
}
