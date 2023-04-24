import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RoomRepository } from '../storage/room.repository';
import { UserDto, UserStatus } from 'src/dto/user';
import { JoinRoomDto, RoomDto, RoomModel } from 'src/dto/room';
import { TeamType } from 'src/dto/team';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { ERRORS } from '../errors/codes';
import { ThemeService } from '../theme/theme.service';

const MINUTE = 60 * 1000;
const HOUR = MINUTE * 60;

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private teamService: TeamService,
    private userService: UserService,
    private themeService: ThemeService,
  ) { }

  get(roomId: string) {
    return this.roomRepository.getById(roomId);
  }

  changeTheme(roomModel: RoomModel, themeId: string) {
    const themeExist = this.themeService.checkIfExists(themeId);
    if (!themeExist) {
      throw new NotFoundException('not_found_theme');
    }
    roomModel.selectedThemeId = themeId;
    return roomModel;
  }

  startGame(roomModel: RoomModel) {
    roomModel.startedTime = Date.now();
    roomModel.started = true;
    this.setDefaultActivePlayer(roomModel);
    return roomModel;
  }

  endGame(roomModel: RoomModel) {
    roomModel.startedTime = null;
    roomModel.started = false;
    roomModel.words = [];
    return roomModel;
  }

  getFromLink(link: string) {
    if (!link) {
      throw new BadRequestException(ERRORS.NLE);
    }
    const roomByLink = this.roomRepository.getRoomByLink(link);
    if (!roomByLink) {
      throw new UnauthorizedException(ERRORS.NRFL);
    }
    return roomByLink;
  }

  setDefaultActivePlayer(roomModel: RoomModel) {
    const players = this.teamService.getParticipantsIds(roomModel.teamsGroup);
    const hasActiveUser = this.hasActiveUser(players);
    if (hasActiveUser) {
      return;
    }
    const userId = players[Math.floor((Math.random()*players.length))];
    this.userService.changeStatus(userId, UserStatus.ACTIVE);
  }

  hasActiveUser(ids: string[]) {
    const users = ids.map((id) => this.userService.get(id));
    return users.some((u) => u.status === UserStatus.ACTIVE);
  }

  checkIsOwner(room: RoomModel, userId: string) {
    return room.owner.id === userId;
  }

  createOrGet(user: UserDto, link?: string) {
    if (!user) { 
      throw new UnauthorizedException();
    }

    try {
      const existRoom = this.getFromLink(link);
      return existRoom;
    } catch (e) {
      const themeId = this.themeService.getDefault().id;
      const room = this.roomRepository.create(user, themeId);
      const { id } = this.teamService.create(user);
      room.teamsGroup = id;
      return room;
    }
  }

  toDto(room?: RoomModel): RoomDto {
    try {
      const teamsDto = this.teamService.getDtoFromGroup(room.teamsGroup);
      const withUsersTeamsDto = this.userService.addUserToDto(teamsDto);
      const words = this.themeService.toDto(room.selectedThemeId, room.words);
      const remainTime = this.getRemainTime(room);
      const { startedTime, ...restRoom } = room;
      return { ...restRoom, teamsGroup: withUsersTeamsDto, remainTime, words };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  join({ linkSlug, userId }: JoinRoomDto): RoomModel | null {
    const room = this.roomRepository.getRoomByLink(linkSlug);
    if (!room) {
      return null;
    }
    const participants = this.teamService.getParticipantsIds(room.teamsGroup);
    if (participants.includes(userId)) {
      return null;
    }

    const teams = this.teamService.getDtoFromGroup(room.teamsGroup);
    const viewersTeam = teams.find((t) => t.type === TeamType.VIEWERS);
    if (!viewersTeam) {
      return null;
    }

    const newTeam = this.teamService.move(
      room.teamsGroup,
      userId,
      viewersTeam.id,
    );
    
    return room;
  }

  getUsersToNotify(room: RoomDto) {
    return room.teamsGroup.flatMap((t) => t.participants).map(u => u.socketId);
  }

  debug() {
    return this.roomRepository.debug();
  }
  
  canStart(room: RoomModel) {
    const dto = this.toDto(room);
    const isEnoughPlayers = this.teamService.enoughPlayers(dto.teamsGroup);
    return isEnoughPlayers;
  }

  getRemainTime(room: RoomModel) {
    if (!room.started) {
      return 0;
    }
    const now = Date.now();
    return MINUTE - (now - room.startedTime);
  }

  changeActiveUser(room: RoomModel, userId: string, changeAll?: boolean) {
    const dto = this.toDto(room);
    dto.teamsGroup.forEach((t) => {
      t.participants.forEach((p) => {
        this.userService.changeStatus(p.id, UserStatus.READY);
      })
    })
    if (changeAll) {
      return { socketId: '' };
    }

    this.userService.changeStatus(userId, UserStatus.ACTIVE);
    return this.userService.get(userId);
  }

  deleteRoom(room: RoomModel) {
    this.roomRepository.deleteById(room.id);
    this.teamService.deleteById(room.teamsGroup);
    this.changeActiveUser(room, '', true);
  }

  removeEmptyRooms() {
    let deletedCount = 0;
    const roomMap = this.roomRepository.getAll();
    for (const id in roomMap) {
      const room = roomMap[id];
      const playersCount = this.teamService.getParticipantsIds(room.teamsGroup).length;
      const now = Date.now();
      const removeAfter = room.createdAt.getTime() + HOUR;
      if (playersCount === 0 && now > removeAfter) {
        this.deleteRoom(room);
        deletedCount += 1;
      }
    }
    console.log(`Removed ${deletedCount} rooms`);
    
  }
}
