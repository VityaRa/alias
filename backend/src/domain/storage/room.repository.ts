import { RoomDto } from 'src/dto/room';

import { Injectable } from '@nestjs/common';

interface RoomMap {
  [id: string]: RoomDto
}

@Injectable()
export class RoomRepository {
  roomMap: RoomMap;
  constructor() {
    this.roomMap = {};
  }

  create(roomDto: RoomDto) {
    // const { name } = createUserDto;
    // const uid = v4();
    // const user: UserDto = {
    //   name,
    //   id: uid,
    //   status: UserStatus.READY,
    // }
    // this.roomMap[user.id] = user;
    // return user;
  }

  getById(id: string) {
    return this.roomMap[id];
  }
}
