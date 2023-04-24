import { Module } from '@nestjs/common';
import { RoomModule } from './domain/room/room.module';
import { UserModule } from './domain/user/user.module';
import { MainGateway } from './domain/main.gateway';
import { ThemeModule } from './domain/theme/theme.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [RoomModule, UserModule, ThemeModule, ScheduleModule.forRoot(),],
  controllers: [],
  providers: [MainGateway],
})
export class AppModule {}
