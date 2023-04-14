import { TeamDto } from "./team";
import { UserDto } from "./user";

export interface RoomDto {
  teams: TeamDto[];
  id: string;
  linkSlug: string;
  owner: UserDto
}

export interface JoinRoomDto {
  user: UserDto;
  linkSlug: string;
}