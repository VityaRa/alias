import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user';
import { UserRepository } from '../storage/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }
}
