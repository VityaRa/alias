export interface WordDto {
  id: string;
  value: string;
}

export interface ThemeDto {
  title: string;
  id: string;
}

export interface ThemeWithWordsDto extends ThemeDto {
  words: WordDto[];
}