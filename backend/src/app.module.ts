import { Module } from '@nestjs/common';
import { RoomModule } from './domain/room/room.module';
import { UserModule } from './domain/user/user.module';
import { MainGateway } from './domain/main.gateway';

@Module({
  imports: [RoomModule, UserModule],
  controllers: [],
  providers: [MainGateway],
})
export class AppModule {}
