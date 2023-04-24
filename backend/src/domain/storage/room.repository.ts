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
  public roomMap: RoomMap;
  constructor() {
    this.roomMap = {};
  }

  deleteById(groupId: string) {
    delete this.roomMap[groupId];
  }

  getAll() {
    return this.roomMap;
  }

  create(userDto: UserDto, themeId: string) {
    const roomId = v4();
    const linkSlug = v4();
    const room: RoomModel = {
      teamsGroup: null,
      id: roomId,
      linkSlug,
      owner: userDto,
      selectedThemeId: themeId,
      startedTime: null,
      started: false,
      words: [],
      prevPlayerId: null,
      playedUsers: [],
      createdAt: new Date(),
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
  
  debug(): any {
    return this.roomMap
  }

  updateRoomById(roomId: string, update: RoomModel) {
    this.roomMap[roomId] = update;
    return update;
  }
}
