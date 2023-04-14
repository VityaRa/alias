import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';
import { ThemeRepository } from '../storage/theme.repository';

@Module({
  imports: [],
  controllers: [ThemeController],
  providers: [ThemeService, ThemeRepository],
  exports: [ThemeService, ThemeRepository],
})
export class ThemeModule {}
