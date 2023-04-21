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
    const test2: ThemeWithWordsDto = {
      id: '123123123',
      title: 'Трудный',
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
    this.themes.push(test2);
  }

  getLabels() {
    return this.themes.map(({ words, ...rest }) => rest);
  }

  getNextWordTheme(themeId: string, usedWords?: string[]) {
    const theme = this.themes.find((t) => t.id === themeId);
    const notUsedWords = theme.words.filter((w) => !usedWords.includes(w.id));
    const shuffled = this.shuffleWords(notUsedWords);
    return shuffled[0];
  }

  private shuffleWords(array: WordDto[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getById(id: string) {
    return this.themes.find((t) => t.id === id);
  }

  toDto(themeId: string, ids: string[]) {
    const theme = this.getById(themeId);
    return ids.map((id) => {
      return theme.words.find((w) => w.id === id);
    })
  }
}

