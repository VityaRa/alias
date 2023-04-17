import { TeamDto } from "./team";
import { UserDto } from "./user";

export interface RoomModel {
  id: string;
  linkSlug: string;
  owner: UserDto;
  teamsGroup: string | null;
}

export interface RoomDto {
  teamsGroup: TeamDto[];
  id: string;
  linkSlug: string;
  owner: UserDto
}

export interface JoinRoomDto {
  user: UserDto;
  linkSlug: string;
}