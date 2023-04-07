import { TeamDto } from "./team";

export interface RoomDto {
  teams: TeamDto;
  id: string;
  viewers: TeamDto;
  linkSlug: string;
}