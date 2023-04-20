import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';


@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('debug')
  debug() {
    const result = [];
    const models = this.roomService.debug();
    for (const modelKey in models) {
      const roomModel = models[modelKey];
      result.push(this.roomService.toDto(roomModel));
    }
    return result
  }
}
