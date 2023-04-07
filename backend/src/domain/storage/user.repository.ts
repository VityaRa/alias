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
    const { name } = createUserDto;
    const uid = v4();
    const user: UserDto = {
      name,
      id: uid,
      status: UserStatus.READY,
    }
    this.usersMap[user.id] = user;
    return user;
  }

  getById(id: string) {
    return this.usersMap[id];
  }
}
