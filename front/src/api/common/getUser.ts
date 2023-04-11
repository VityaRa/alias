import { IRoom } from "../room/model";
import { IUser } from "../user/model";

export interface GetUserResult {
  user: IUser,
  room: IRoom,
}