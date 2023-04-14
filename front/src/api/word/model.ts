export interface IWord {
  value: string;
  id: string;
  status: WordStatus
}

export enum WordStatus {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
  DEFAULT = 'DEFAULT',
  CURRENT = 'CURRENT',
}