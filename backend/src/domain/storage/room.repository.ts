import { RoomDto, RoomModel } from 'src/dto/room';

import { Injectable } from '@nestjs/common';
import { TeamType } from 'src/dto/team';
import { UserDto } from 'src/dto/user';
import { v4 } from 'uuid';

interface RoomMap {
  [id: string]: RoomModel
}

@Injectable()
export class RoomRepository {
  roomMap: RoomMap;
  constructor() {
    this.roomMap = {};
    setInterval(() => {
      console.log(this.roomMap);
    }, 5000)
  }

  create(userDto: UserDto) {
    const roomId = v4();
    const linkSlug = v4();
    const room: RoomModel = {
      teamsGroup: null,
      id: roomId,
      linkSlug,
      owner: userDto,
    }
    this.roomMap[room.id] = room;
    return room;
  }

  getById(id: string) {
    return this.roomMap[id];
  }

  getRoomByLink(link: string) {
    return Object.values(this.roomMap).find((r) => r.linkSlug === link);
  }
  
  // addUserToTeam(user: UserDto, roomId: string, teamId: string): RoomDto {
  //   const room = this.getById(roomId);
  //   const team = room.teams.find((t) => t.id === teamId);
  //   const newTeamParticipants = [...team.participants, user];
  //   const newTeams = room.teams.map((t) => {
  //     if (t.id === teamId) {
  //       return {
  //         ...t,
  //         participants: newTeamParticipants,
  //       }
  //     }
  //   });

  //   return {
  //     ...room,
  //     teams: newTeams,
  //   };
  // }

  // getViewersTeamId(roomId: string) {
  //   const room = this.getById(roomId);
  //   return room.teams.find((t) => t.type === TeamType.VIEWERS);
  // }

  updateRoomById(roomId: string, update: RoomModel) {
    this.roomMap[roomId] = update;
    return update;
  }
}
