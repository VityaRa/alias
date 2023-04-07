import { UserDto } from "./user";

export interface TeamDto {
  title: string;
  participants: UserDto[],
  id: string;
}