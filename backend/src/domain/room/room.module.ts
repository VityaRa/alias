import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRepository } from '../storage/room.repository';
import { TeamRepository } from '../storage/team.repository';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../storage/user.repository';
import { RoomController } from './room.controller';
import { TeamController } from '../team/team.controller';
import { ThemeService } from '../theme/theme.service';
import { ThemeRepository } from '../storage/theme.repository';

@Module({
  imports: [],
  controllers: [RoomController, TeamController],
  providers: [RoomService, RoomRepository, TeamRepository, TeamService, UserService, UserRepository, ThemeService, ThemeRepository],
  exports: [RoomRepository, RoomService, TeamRepository, TeamService, UserService, UserRepository, ThemeService, ThemeRepository],
})
export class RoomModule {}
