import { Request, Response, RequestHandler } from 'express';
import TeamServices from '../services/teamService';

class TeamController {
  private _teamService = new TeamServices();

  public allTeams: RequestHandler = async (_req: Request<unknown, unknown>, res: Response) => {
    const { code, data } = await this._teamService.teams();
    res.status(code).json(data);
  };

  public oneTeam: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { code, data } = await this._teamService.team(id);
    return res.status(code).json(data);
  };
}

export default TeamController;
