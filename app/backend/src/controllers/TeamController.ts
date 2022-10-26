import { Request, Response } from 'express';
import TeamServices from '../services/TeamService';

class TeamController {
  private _teamService = new TeamServices();

  public async allTeams(_req: Request<unknown, unknown>, res: Response) {
    const { code, data } = await this._teamService.teams();
    res.status(code).json(data);
  }

  public async oneTeam(req: Request, res: Response) {
    const { id } = req.params;
    const { code, data } = await this._teamService.team(id);
    return res.status(code).json(data);
  }
}

export default TeamController;
