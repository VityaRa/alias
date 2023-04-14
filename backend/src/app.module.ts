import { Module } from '@nestjs/common';
import { RoomModule } from './domain/room/room.module';
import { UserModule } from './domain/user/user.module';
import { MainGateway } from './domain/main.gateway';
import { ThemeModule } from './domain/theme/theme.module';

@Module({
  imports: [RoomModule, UserModule, ThemeModule],
  controllers: [],
  providers: [MainGateway],
})
export class AppModule {}
