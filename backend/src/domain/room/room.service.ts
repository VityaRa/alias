import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  getRoom(): string {
    return 'Hello room!';
  }
}
