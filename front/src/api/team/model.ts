import { IUser } from "../user/model";

export enum TeamType {
  PLAYABLE = 'PLAYABLE',
  VIEWERS = 'VIEWERS',
}

export interface ITeam {
  title: string;
  participants: IUser[],
  id: string;
  type: TeamType,
}