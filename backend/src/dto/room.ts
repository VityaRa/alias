import { TeamDto } from "./team";
import { WordDto } from "./theme";
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
  prevPlayerId: string | null;
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
  words: WordDto[];
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