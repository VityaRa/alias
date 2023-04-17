import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRepository } from '../storage/room.repository';
import { TeamRepository } from '../storage/team.repository';
import { TeamService } from '../team/team.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomService, RoomRepository, TeamRepository, TeamService],
  exports: [RoomRepository, RoomService, TeamRepository, TeamService],
})
export class RoomModule {}
