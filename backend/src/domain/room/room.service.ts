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

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private teamService: TeamService,
  ) {}

  get(roomId: string) {
    return this.roomRepository.getById(roomId);
  }

  create(user: UserDto) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const room = this.roomRepository.create(user);
    const { id } = this.teamService.create(user);
    room.teamsGroup = id;
    return room;
  }

  toDto(room: RoomModel): RoomDto {
    const teamsDto = this.teamService.getDtoFromGroup(room.teamsGroup);
    return { ...room, teamsGroup: teamsDto };
  }

  join({ linkSlug, user }: JoinRoomDto) {
    const room = this.roomRepository.getRoomByLink(linkSlug);
    if (!room) {
      throw new BadRequestException('Комнаты не существует');
    }
    const participants = this.teamService.getParticipantsIds(room.teamsGroup);
    if (participants.includes(user.id)) {
      throw new BadRequestException('Вы уже в комнате');
    }

    const teams = this.teamService.getDtoFromGroup(room.teamsGroup);
    const viewersTeam = teams.find((t) => t.type === TeamType.VIEWERS);
    if (!viewersTeam) {
      throw new BadRequestException();
    }
    const newRoom = this.teamService.move(
      room.teamsGroup,
      user.id,
      viewersTeam.id,
    );
    return newRoom;
  }

  emitEveryone() {}

  getRoomUsers() {}
}
