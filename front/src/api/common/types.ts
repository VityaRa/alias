import { AxiosResponse } from "axios";
import { IRoom } from "../room/model";
import { IUser } from "../user/model";
import { IWord } from "../word/model";

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface IResponse<T> extends AxiosResponse {
  data: ApiResponse<T>;
}

export interface GetUserResult {
  user: IUser,
  room: IRoom,
  error?: string;
}

export enum API_ERRORS {
  DEFAULT = 'error',
}

export interface ErrorType {
  error?: string;
}

export interface GetOrCreateRoom extends ErrorType {
  room: IRoom,
}

export interface LoginUserResult extends ErrorType {
  user: IUser,
}

export interface StartGameResult extends ErrorType {
  started: boolean;
  remainTime: number | null;
}

export interface EndGameResult extends ErrorType {
  started: boolean;
  remainTime: number;
}

export interface NextWordResult extends ErrorType {
  nextWord: IWord,
}