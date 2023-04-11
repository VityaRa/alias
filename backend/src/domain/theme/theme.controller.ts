import { Controller, Get } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeDto } from 'src/dto/theme';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get('')
  getList(): ThemeDto[] {
    return this.themeService.getList();
  }
}
