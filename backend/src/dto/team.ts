import { UserDto } from "./user";

export enum TeamType {
  PLAYABLE = 'PLAYABLE',
  VIEWERS = 'VIEWERS',
}

export interface TeamModel {
  title: string;
  participants: string[],
  id: string;
  type: TeamType,
}

export interface TeamDto {
  title: string;
  participants: UserDto[],
  id: string;
  type: TeamType,
}