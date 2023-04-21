import { TeamDto } from "./team";
import { UserDto } from "./user";
import { WordStatus } from "./word";

export interface RoomModel {
  id: string;
  linkSlug: string;
  owner: UserDto;
  teamsGroup: string | null;
  selectedThemeId: string;
  started: boolean;
  startedTime: number | null;
  words: string[];
  playedUsers: string[];
}

export interface RoomDto {
  teamsGroup: TeamDto[];
  id: string;
  linkSlug: string;
  owner: UserDto,
  selectedThemeId: string;
  started: boolean;
  remainTime: number | null;
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

export interface StartGameDto {
  linkSlug: string;
}

export interface NextWordDto {
  linkSlug: string;
  wordId: string;
  status: WordStatus;
}