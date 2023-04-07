import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user';
import { UserRepository } from '../storage/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }
  create(createUserDto: CreateUserDto) {
    if (!createUserDto.name) {
      throw new BadRequestException();
    }
    const user = this.userRepository.create(createUserDto);
    return user;
  }
}
