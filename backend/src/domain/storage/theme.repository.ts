import { Injectable } from '@nestjs/common';
import { ThemeDto, ThemeWithWordsDto, WordDto } from 'src/dto/theme';
import { v4 } from 'uuid';

@Injectable()
export class ThemeRepository {
  themes: ThemeWithWordsDto[];
  constructor() {
    this.themes = [];
    const test: ThemeWithWordsDto = {
      id: '123123',
      title: 'Обычный',
      words: [
        {
          value: 'Кот',
          id: v4(),
        },
        {
          value: 'Собака',
          id: v4(),
        },
        {
          value: 'Компьютер',
          id: v4(),
        },
        {
          value: 'Мышка',
          id: v4(),
        },
      ],
    };
    this.themes.push(test);
  }

  getLabels() {
    return this.themes.map(({ words, ...rest }) => rest);
  }

  getNextWordTheme(themeId: string, usedWords?: string[]) {
    const theme = this.themes.find((t) => t.id === themeId);
    if (!theme) {
      return [];
    }

    const notUsedWords = theme.words.filter((w) => !usedWords.includes(w.value));
    const shuffled = this.shuffleWords(notUsedWords);
    return shuffled[0];
  }

  shuffleWords(array: WordDto[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
