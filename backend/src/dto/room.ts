import { TeamDto } from "./team";
import { UserDto } from "./user";

export interface RoomModel {
  id: string;
  linkSlug: string;
  owner: UserDto;
  teamsGroup: string | null;
  selectedThemeId: string;
}

export interface RoomDto {
  teamsGroup: TeamDto[];
  id: string;
  linkSlug: string;
  owner: UserDto
}

export interface JoinRoomDto {
  userId: string;
  linkSlug: string;
}

export interface ChangeTeamDto {
  roomId: string;
  userId: string;
  teamId: string;
}

export interface ChangeThemeDto {
  themeId: string;
  linkSlug: string;
}