// import ResponseDto from '../controllers/dto/ResponseDto';
import CreateMatchesDto from '../controllers/dto/CreateMatchesDto';
import Match from '../database/models/matches';
import Team from '../database/models/teams';
import ResponseDto from '../controllers/dto/ResponseDto';

class ServiceMatch {
  private _matchModel = Match;
  private _teamModel = Team;

  public async findAll() {
    const matches = await this._matchModel.findAll({
      include: [{ model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      { model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return { code: 200, data: matches };
  }

  public async matchesFilter(inProgress: string): Promise<ResponseDto> {
    if (!inProgress) return { code: 400, data: { message: 'inProgress must be true or false' } };
    const query = JSON.parse(inProgress);

    const matches = await this._matchModel.findAll({
      where: { inProgress: query },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, data: matches };
  }

  public async addMatches(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: CreateMatchesDto,
  ): Promise<ResponseDto> {
    const body = { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals };
    const team1 = await this._teamModel.findByPk(body.homeTeam) as Team;
    const team2 = await this._teamModel.findByPk(body.awayTeam) as Team;
    if (!team1 || !team2) return { code: 404, data: { message: 'There is no team with such id!' } };
    if (body.homeTeam === body.awayTeam) {
      return { code: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const created = await this._matchModel.create({ ...body, inProgress: true });

    return { code: 201, data: created };
  }

  public async editMatches(id: string): Promise<ResponseDto> {
    const result = await this._matchModel.findByPk(id) as Match;
    if (!result) {
      return { code: 401, data: { message: 'Não encontrado' } };
    }
    await result.update({ inProgress: 'false' });
    return { code: 200, data: { message: 'Finished' } };
  }

  public async updateMatches(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ): Promise<ResponseDto> {
    const match = await this._matchModel.findByPk(id) as Match;

    await match.update({ homeTeamGoals, awayTeamGoals });
    return { code: 200, data: { message: 'OK' } };
  }
}

export default ServiceMatch;
