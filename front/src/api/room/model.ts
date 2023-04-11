import { ITeam } from "../team/model";
import { IUser } from "../user/model";

export interface IRoom {
  teams: ITeam[];
  id: string;
  linkSlug: string;
  owner: IUser,
}