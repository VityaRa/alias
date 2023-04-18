import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user';
import { UserRepository } from '../storage/user.repository';
import { TeamDto, TeamModel } from 'src/dto/team';
import { RoomDto } from 'src/dto/room';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }
  create(createUserDto: CreateUserDto) {
    if (!createUserDto.name) {
      throw new BadRequestException('Incorrect name');
    }
    const user = this.userRepository.create(createUserDto);
    return user;
  }

  remove(socketId: string) {
    return this.userRepository.remove(socketId);
  }

  get(userId?: string) {
    if (!userId) {
      throw new BadRequestException('Incorrect userId');
    }
    const user = this.userRepository.getById(userId);
    return user;
  }

  addUserToDto(teams: TeamModel[]) {
    return teams.map((t) => ({...t, participants: t.participants.map((pId) => this.get(pId))}));
  }
}
