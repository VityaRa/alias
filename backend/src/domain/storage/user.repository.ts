import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto, UserStatus } from 'src/dto/user';
import { v4 } from 'uuid';

interface UserMap {
  [id: string]: UserDto
}

@Injectable()
export class UserRepository {
  usersMap: UserMap;
  constructor() {
    this.usersMap = {};
  }

  create(createUserDto: CreateUserDto) {
    const uid = v4();
    const user: UserDto = {
      ...createUserDto,
      id: uid,
      status: UserStatus.READY,
    }
    this.usersMap[user.id] = user;
    return user;
  }

  getById(id: string) {
    return this.usersMap[id];
  }

  remove(socketId: string) {
    const user = Object.values(this.usersMap).find((v) => v.socketId === socketId);
    const { id }= user;
    delete this.usersMap[id];
    return user;
  }
}
