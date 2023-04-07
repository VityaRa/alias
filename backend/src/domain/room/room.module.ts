import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRepository } from '../storage/room.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomService, RoomRepository],
  exports: [RoomRepository, RoomService],
})
export class RoomModule {}
