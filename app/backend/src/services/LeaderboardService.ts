import LeaderBoardDto from '../controllers/dto/leaderBordDto';
import Match from '../database/models/matches';
import queryLeaderboard from './QueryLeaderboard';

class LeaderboardService {
  private _matchModel = Match;

  public async leadBoardHome() {
    const [result] = await this
      ._matchModel.sequelize?.query(queryLeaderboard.homesTeams) as [LeaderBoardDto[], unknown];

    return { code: 200, data: result };
  }

  public async leadBoardAway() {
    const [result] = await this
      ._matchModel.sequelize?.query(queryLeaderboard.awayTeams) as [LeaderBoardDto[], unknown];

    return { code: 200, data: result };
  }
}

export default LeaderboardService;
