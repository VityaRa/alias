import { Logger } from '@nestjs/common';
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
import { JoinRoomDto } from 'src/dto/room';
import { CreateUserDto, GetUserDto } from 'src/dto/user';

enum IncomingMessages {
  LOGIN = 'user:login',
  JOIN = 'user:join',
  GET = 'user:get',
  TEAM_CHANGE = 'team:change',
}

enum SentMessages {
  DATA = 'user:data',
  JOINED = 'user:joined',
}

@WebSocketGateway({cors: true})
export class MainGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private roomService: RoomService,
    private userService: UserService,
  ) {
  }
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage(IncomingMessages.LOGIN)
  handleLogin(@ConnectedSocket() client: Socket, @MessageBody() data: CreateUserDto): void {
    this.logger.log(`${IncomingMessages.LOGIN}:`, data);
    const user = this.userService.create({
      name: data.name,
      socketId: client.id,
    });
    const room = this.roomService.create(user);
    const roomDto = this.roomService.toDto(room);
    client.emit(SentMessages.DATA, {
      user,
      room: roomDto,
    });
  }

  @SubscribeMessage(IncomingMessages.GET)
  handleGet(@ConnectedSocket() client: Socket, @MessageBody() data: GetUserDto): void {
    this.logger.log(`${IncomingMessages.GET}:`, data);
    const user = this.userService.get(data.userId);
    const room = this.roomService.get(data.roomId);
    const roomDto = this.roomService.toDto(room);
    client.emit(SentMessages.DATA, {
      user,
      room: roomDto,
    });
  }

  @SubscribeMessage(IncomingMessages.TEAM_CHANGE)
  handleJoin(client: Socket, data: JoinRoomDto) {
    this.logger.log(`${IncomingMessages.TEAM_CHANGE}:`, data);

    // add validations;
    const room = this.roomService.join(data);
    client.emit(SentMessages.JOINED, {
      room,
    });
  }

  @SubscribeMessage(IncomingMessages.JOIN)
  handleTeamChange(client: Socket, data: JoinRoomDto) {
    this.logger.log(`${IncomingMessages.JOIN}: ${data}`);
    // add validations;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    try {
      // this.userService.remove(client.id);
    } catch (e) {
      this.logger.error('cant remove userId: ', client.id);
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
