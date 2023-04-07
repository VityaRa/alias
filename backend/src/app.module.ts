import { Module } from '@nestjs/common';
import { RoomModule } from './domain/room/room.module';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [RoomModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
