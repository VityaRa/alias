export interface IWord {
  id: string;
  value: string;
}

export interface ITheme {
  title: string;
  id: string;
}

export interface IThemeWithWords extends ITheme {
  words: IWord[];
}