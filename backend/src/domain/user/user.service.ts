import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UserStatus } from 'src/dto/user';
import { UserRepository } from '../storage/user.repository';
import { TeamDto, TeamModel } from 'src/dto/team';
import { RoomDto } from 'src/dto/room';
import { ERRORS } from '../errors/codes';

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

  changeStatus(userId: string, status: UserStatus) {
    this.userRepository.changeStatus(userId, status);
  }

  getBySocketId(socketId: string) {
    const user = this.userRepository.getBySocket(socketId);
  }

  get(userId?: string) {
    if (!userId) {
      throw new BadRequestException(ERRORS.NUI);
    }
    const user = this.userRepository.getById(userId);
    return user;
  }

  getAndUpdate(userId?: string, newSocketId?: string) {
    if (!userId) {
      throw new BadRequestException(ERRORS.NUI);
    }
    const user = this.userRepository.getById(userId);
    if (!user) {
      throw new BadRequestException(ERRORS.NU);
    }
    if (user.socketId !== newSocketId) {
      this.userRepository.updateById(userId, {socketId: newSocketId});
    }
    return user;
  }

  addUserToDto(teams: TeamModel[]) {
    return teams.map((t) => ({...t, participants: t.participants.map((pId) => this.get(pId))}));
  }
}
