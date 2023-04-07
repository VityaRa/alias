import { UserDto } from "./user";

export enum TeamType {
  PLAYABLE = 'PLAYABLE',
  VIEWERS = 'VIEWERS',
}

export interface TeamDto {
  title: string;
  participants: UserDto[],
  id: string;
  type: TeamType,
}