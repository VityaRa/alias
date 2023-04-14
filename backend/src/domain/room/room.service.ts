import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RoomRepository } from '../storage/room.repository';
import { UserDto } from 'src/dto/user';
import { JoinRoomDto } from 'src/dto/room';
import { TeamType } from 'src/dto/team';

@Injectable()
export class RoomService {
  constructor(private roomRepository: RoomRepository) { };

  create(user: UserDto) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const room = this.roomRepository.create(user);
    return room;
  }
  
  join({linkSlug, user}: JoinRoomDto) {
    const room = this.roomRepository.getRoomByLink(linkSlug);
    if (!room) {
      throw new BadRequestException('Комнаты не существует');
    }
    const participants = this.roomRepository.getParticipantsIds(room);
    if (participants.includes(user.id)) {
      throw new BadRequestException('Вы уже в комнате');
    }

    const viewersTeam = room.teams.find((t) => t.type === TeamType.VIEWERS);
    if (!viewersTeam) {
      throw new BadRequestException();
    }
    const newRoom = this.roomRepository.addUserToTeam(user, room.id, viewersTeam.id);
    return newRoom;
  }

  emitEveryone() {

  }

  getRoomUsers() {
    
  }
}
