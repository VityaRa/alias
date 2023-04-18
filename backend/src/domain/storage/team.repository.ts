import { Injectable, Logger } from '@nestjs/common';
import { TeamDto, TeamModel, TeamType } from 'src/dto/team';
import { UserDto } from 'src/dto/user';
import { v4 } from 'uuid';

interface TeamMap {
  [id: string]: TeamModel[]
}

@Injectable()
export class TeamRepository {
  teamMap: TeamMap;
  private logger: Logger = new Logger('TeamRepository');
  constructor() {
    this.teamMap = {};
  }

  create(userDto: UserDto) {
    const teamGroupId = v4();

    const teams = this.getDefaults(userDto);
    this.teamMap[teamGroupId] = teams;
    return {teams, id: teamGroupId};
  }

  removeFromTeam(team: TeamModel, userId: string) {
    team.participants = team.participants.filter((pId) => pId !== userId);
    return team;
  }

  addToTeam(team: TeamModel, userId: string) {
    team.participants = [...team.participants, userId];
    return team;
  }

  move(groupId: string, userId: string, toId: string) {
    this.logger.log(`Got groupId: ${groupId}, userId: ${userId}, toId: ${toId}`)
    const teamGroup = this.teamMap[groupId];
    
    const userTeam = teamGroup.find((t) => t.participants.includes(userId));
    if (toId === userTeam.id) {
      return teamGroup;
    }

    const movedToTeam = teamGroup.find((t) => t.id === toId);
    this.removeFromTeam(userTeam, userId);
    this.addToTeam(movedToTeam, userId);
    return teamGroup;
  }

  update(groupId: string, updatedTeams: any) {
    this.teamMap[groupId] = [
      ...updatedTeams,
    ]
    return this.teamMap[groupId];
  }

  getDefaults(user?: UserDto): TeamModel[] {
    const initialViewers = [];
    if (user) {
      initialViewers.push(user.id);
    }
    return [
      {
        title: 'Команда A',
        participants: [],
        id: v4(),
        type: TeamType.PLAYABLE,
      },
      {
        title: 'Команда B',
        participants: [],
        id: v4(),
        type: TeamType.PLAYABLE,
      },
      {
        title: 'Наблюдатели',
        participants: initialViewers,
        id: v4(),
        type: TeamType.VIEWERS,
      },
    ]
  }

  getDtoFromGroupId(groupId: string) {
    return this.teamMap[groupId];
  }
}
