import ResponseDto from '../controllers/dto/ResponseDto';
import CreateMatchesDto from '../controllers/dto/CreateMatchesDto';
import Match from '../database/models/matches';
import Team from '../database/models/teams';

export default class ServiceMatch {
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

  public addMatches = async (
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: CreateMatchesDto,
  ): Promise<ResponseDto> => {
    const body = { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
    const team = await this._teamModel.findByPk(body.homeTeam) as Team;

    if (!team) { return { code: 404, data: { message: 'There is no team with such id!' } }; }
    if (body.homeTeam === body.awayTeam) {
      return { code: 401,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const created = await this._matchModel.create({ ...body });

    return { code: 201, data: created };
  };

  public editMatches = async (id: string): Promise<ResponseDto> => {
    const result = await this._matchModel.findByPk(id) as Match;
    if (!result) {
      return { code: 401, data: { message: 'Não encontrado' } };
    }
    await result.update({ inProgress: 'false' });
    return { code: 200, data: { message: 'Finished' } };
  };

  public updateMatches = async (
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ): Promise<ResponseDto> => {
    const match = await this._matchModel.findByPk(id) as Match;

    // if (!match) {
    //   throw new ErrorCustom(StatusCodes.BAD_REQUEST, 'non-existent match');
    // }
    await match.update({ homeTeamGoals, awayTeamGoals });
    return { code: 200, data: { message: 'OK' } };
  };
}
