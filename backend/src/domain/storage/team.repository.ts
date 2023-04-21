import { Injectable, Logger } from '@nestjs/common';
import { TeamDto, TeamModel, TeamType } from 'src/dto/team';
import { UserDto, UserStatus } from 'src/dto/user';
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
    if (!team) {
      return null;
    }
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
    if (toId === userTeam?.id) {
      return teamGroup;
    }

    const movedToTeam = teamGroup.find((t) => t.id === toId);
    const removedFromTeam = this.removeFromTeam(userTeam, userId);
    const addedToTeam = this.addToTeam(movedToTeam, userId);

    this.teamMap[groupId] = teamGroup.map((t) => {
      if (t.id === removedFromTeam?.id) {
        t.participants = removedFromTeam.participants;
      }
      if (t.id === addedToTeam?.id) {
        t.participants = addedToTeam.participants;
      }
      return t;
    })
    return teamGroup;
  }

  update(groupId: string, updatedTeams: any) {
    this.teamMap[groupId] = [
      ...updatedTeams,
    ]
    return this.teamMap[groupId];
  }

  increasePoint(groupId: string, teamId: string) {
    const teamGroup = this.teamMap[groupId];
    this.teamMap[groupId] = teamGroup.map((t) => {
      if (t.id === teamId) {
        t.points += 1;
      }
      return t;
    })
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
        points: 0,
      },
      {
        title: 'Команда B',
        participants: [],
        id: v4(),
        type: TeamType.PLAYABLE,
        points: 0,
      },
      {
        title: 'Наблюдатели',
        participants: initialViewers,
        id: v4(),
        type: TeamType.VIEWERS,
        points: 0,
      },
    ]
  }

  getDtoFromGroupId(groupId: string) {
    return this.teamMap[groupId];
  }

  debug(): any {
    return this.teamMap;
  }

  getUserTeamId(groupId: string, userId: string) {
    const teamGroup = this.teamMap[groupId];
    let teamId = null;
    teamGroup.forEach((t) => {
      if (t.participants.includes(userId)) {
        teamId = t.id;
        return;
      }
    })
    return teamId;
  }

  setStatusForUser(userId: string, status: UserStatus) {
  }

  setNextActivePlayer(teamGroupId: string, prevActiveUserId: string) {
    const teamGroup = this.teamMap[teamGroupId];
    const teamId = this.getUserTeamId(teamGroupId, prevActiveUserId);
  }
}
