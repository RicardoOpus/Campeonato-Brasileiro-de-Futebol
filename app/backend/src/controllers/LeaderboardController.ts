import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LoginDto from './dto/LoginDto';

class LeaderbordController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async getHomeTeams(_req: Request<unknown, unknown, LoginDto>, res: Response) {
    const { code, data } = await this.leaderboardService.leadBoardHome();
    return res.status(code).json(data);
  }

  public async getAwayTeams(_req: Request<unknown, unknown, LoginDto>, res: Response) {
    const { code, data } = await this.leaderboardService.leadBoardAway();
    return res.status(code).json(data);
  }
}

export default LeaderbordController;
