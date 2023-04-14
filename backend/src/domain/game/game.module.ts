import { Module } from '@nestjs/common';
import { UserService } from './game.service';
import { UserRepository } from '../storage/user.repository';

@Module({
  imports: [],
  providers: [UserService, UserRepository],
})
export class UserModule {}
