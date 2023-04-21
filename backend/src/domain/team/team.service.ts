import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user';
import { TeamRepository } from '../storage/team.repository';
import { TeamDto, TeamType } from 'src/dto/team';

@Injectable()
export class TeamService {
  constructor(private teamRepository: TeamRepository) { };

  getDefaults(user: UserDto) {
    return this.teamRepository.getDefaults(user);
  }

  create(user: UserDto) {
    return this.teamRepository.create(user);
  }

  getParticipantsIds(groupId: string) {
    return this.teamRepository.teamMap[groupId].flatMap((t) => t.participants)
  }

  getDtoFromGroup(groupId: string) {
    return this.teamRepository.getDtoFromGroupId(groupId);
  }

  move(groupId: string, userId: string, toId: string) {
    return this.teamRepository.move(groupId, userId, toId);
  }

  debug() {
    return this.teamRepository.debug();
  }

  enoughPlayers(teams: TeamDto[]) {
    return teams.filter((t) => t.type !== TeamType.VIEWERS && t.participants.length >= 2).length === 2; 
  }

  setNextActivePlayer(teamGroup: string, prevActiveUserId: string) {
    this.teamRepository.setNextActivePlayer(teamGroup, prevActiveUserId);
  }

  getPlayersCount(teams: TeamDto[]) {
    let count = 0;
    teams.forEach((t) => {
      if (t.type === TeamType.PLAYABLE) {
        count += t.participants.length;
      }
    })
    return count;
  }
}
