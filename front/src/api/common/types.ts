import { AxiosResponse } from "axios";
import { IRoom } from "../room/model";
import { IUser } from "../user/model";

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

export interface GetOrCreateRoom {
  room: IRoom,
  error?: string;
}

export interface LoginUserResult {
  user: IUser,
  error?: string;
}

export interface StartGameResult {
  started: boolean;
  remainTime: number | null;
}