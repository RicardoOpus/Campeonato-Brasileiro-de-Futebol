import { Request, Response, RequestHandler } from 'express';
import MatchServices from '../services/MatchService';
import CreateMatchesDto from './dto/CreateMatchesDto';

class MatchController {
  private _matchService = new MatchServices();

  public allMatches: RequestHandler = async (_req: Request<unknown, unknown>, res: Response) => {
    const { code, data } = await this._matchService.findAll();
    res.status(code).json(data);
  };

  // public oneTeam: RequestHandler = async (req, res) => {
  //   const { id } = req.params;
  //   const { code, data } = await this._teamService.team(id);
  //   return res.status(code).json(data);
  // };

  public crateMatches: RequestHandler = async (req: Request<unknown, unknown>, res: Response) => {
    const body = req.body as CreateMatchesDto;
    const { authorization: token } = req.headers;
    if (token === 'token') return res.status(401).json({ message: 'Token must be a valid token' });
    const { code, data } = await this._matchService.addMatches(body);
    res.status(code).json(data);
  };

  public editMatches: RequestHandler = async (req, res) => {
    const { code, data } = await this._matchService.editMatches(req.params.id);
    return res.status(code).json(data);
  };

  updateMatches: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { code, data } = await this._matchService.updateMatches(homeTeamGoals, awayTeamGoals, id);
    return res.status(code).json(data);
  };
}

export default MatchController;
