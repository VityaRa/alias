import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';


@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('debug')
  debug() {
    const result = [];
    const teams = this.teamService.debug();
    return teams
  }
}
