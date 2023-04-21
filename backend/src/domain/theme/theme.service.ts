import { BadRequestException, Injectable } from '@nestjs/common';
import { ThemeRepository } from '../storage/theme.repository';
import { ThemeDto } from 'src/dto/theme';

@Injectable()
export class ThemeService {
  constructor(private themeRepository: ThemeRepository) { }

  getList(): ThemeDto[] {
    return this.themeRepository.getLabels();
  }

  checkIfExists(themeId: string) {
    return Boolean(this.themeRepository.getLabels().find((t) => t.id === themeId));
  }

  getDefault() {
    return this.getList()[0];
  }
}
