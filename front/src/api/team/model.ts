import { IUser } from "../user/model";

export interface ITeam {
  title: string;
  participants: IUser[],
  id: string;
}