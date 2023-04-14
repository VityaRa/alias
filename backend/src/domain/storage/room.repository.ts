import { RoomDto } from 'src/dto/room';

import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user';
import { v4 } from 'uuid';
import { TeamDto, TeamType } from 'src/dto/team';

interface RoomMap {
  [id: string]: RoomDto
}

@Injectable()
export class RoomRepository {
  roomMap: RoomMap;
  constructor() {
    this.roomMap = {};
  }

  create(userDto: UserDto) {
    const roomId = v4();
    const linkSlug = v4();
    const teams = this.getDefaultTeams(userDto);
    const room: RoomDto = {
      teams,
      id: roomId,
      linkSlug,
      owner: userDto,
    }
    this.roomMap[room.id] = room;
    return room;
  }

  getDefaultTeams(user?: UserDto): TeamDto[] {
    const initialViewers = [];
    if (user) {
      initialViewers.push(user);
    }
    return [
      {
        title: 'Команда A',
        participants: [],
        id: v4(),
        type: TeamType.PLAYABLE,
      },
      {
        title: 'Команда B',
        participants: [],
        id: v4(),
        type: TeamType.PLAYABLE,
      },
      {
        title: 'Наблюдатели',
        participants: initialViewers,
        id: v4(),
        type: TeamType.VIEWERS,
      },
    ]
  }

  getById(id: string) {
    return this.roomMap[id];
  }

  getRoomByLink(link: string) {
    return Object.values(this.roomMap).find((r) => r.linkSlug === link);
  }
  
  getParticipantsIds(room: RoomDto) {
    return room.teams.flatMap((t) => t.participants.map((p) => p.id));
  }

  addUserToTeam(user: UserDto, roomId: string, teamId: string): RoomDto {
    const room = this.getById(roomId);
    const team = room.teams.find((t) => t.id === teamId);
    const newTeamParticipants = [...team.participants, user];
    const newTeams = room.teams.map((t) => {
      if (t.id === teamId) {
        return {
          ...t,
          participants: newTeamParticipants,
        }
      }
    });

    return {
      ...room,
      teams: newTeams,
    };
  }

  getViewersTeamId(roomId: string) {
    const room = this.getById(roomId);
    return room.teams.find((t) => t.type === TeamType.VIEWERS);
  }

  updateRoomById(roomId: string, update: RoomDto) {
    this.roomMap[roomId] = update;
    return update;
  }
}
