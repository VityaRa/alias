import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { RoomRepository } from '../storage/room.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomService, RoomGateway, RoomRepository],
})
export class RoomModule {}
