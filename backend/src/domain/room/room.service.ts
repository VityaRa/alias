import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RoomRepository } from '../storage/room.repository';
import { UserDto } from 'src/dto/user';
import { JoinRoomDto, RoomDto, RoomModel } from 'src/dto/room';
import { TeamType } from 'src/dto/team';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { ERRORS } from '../errors/codes';

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private teamService: TeamService,
    private userService: UserService,
  ) {}

  get(roomId: string) {
    return this.roomRepository.getById(roomId);
  }

  getFromLink(link: string) {;
    if (!link) {
      throw new BadRequestException(ERRORS.NLE);
    }
    const roomByLink = this.roomRepository.getRoomByLink(link);
    if (!roomByLink) {
      throw new UnauthorizedException(ERRORS.NRFL);
    }
    return roomByLink;
  }

  createOrGet(user: UserDto, link?: string) {
    if (!user) { 
      throw new UnauthorizedException();
    }

    try {
      const existRoom = this.getFromLink(link);
      return existRoom;
    } catch (e) {
      const room = this.roomRepository.create(user);
      const { id } = this.teamService.create(user);
      room.teamsGroup = id;
      return room;
    }
  }

  toDto(room?: RoomModel): RoomDto {
    try {
      const teamsDto = this.teamService.getDtoFromGroup(room.teamsGroup);
      const withUsersTeamsDto = this.userService.addUserToDto(teamsDto);
      return { ...room, teamsGroup: withUsersTeamsDto };
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

  emitEveryone() {}

  getUsersToNotify(room: RoomDto) {
    return room.teamsGroup.flatMap((t) => t.participants).map(u => u.socketId);
  }

  debug() {
    return this.roomRepository.debug();
  }
}
