import { Request, Response } from 'express';
import MatchServices from '../services/MatchService';
import CreateMatchesDto from './dto/CreateMatchesDto';

class MatchController {
  private _matchService = new MatchServices();

  public async matches(req: Request<unknown, unknown>, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const { code, data } = await this._matchService.matchesFilter(inProgress as string);
      return res.status(code).json(data);
    }

    const { code, data } = await this._matchService.findAll();
    res.status(code).json(data);
  }

  // public oneTeam: RequestHandler = async (req, res) => {
  //   const { id } = req.params;
  //   const { code, data } = await this._teamService.team(id);
  //   return res.status(code).json(data);
  // };

  public async crateMatches(req: Request<unknown, unknown>, res: Response) {
    const body = req.body as CreateMatchesDto;
    const { code, data } = await this._matchService.addMatches(body);
    res.status(code).json(data);
  }

  public async editMatches(req: Request, res: Response) {
    const { code, data } = await this._matchService.editMatches(req.params.id);
    return res.status(code).json(data);
  }

  public async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { code, data } = await this._matchService.updateMatches(homeTeamGoals, awayTeamGoals, id);
    return res.status(code).json(data);
  }
}

export default MatchController;
