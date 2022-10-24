// import StatusCodes from 'http-status-codes';
import Teams from '../database/models/teams';
import ResponseDto from '../controllers/dto/ResponseDto';

export default class TeamServices {
  private _teamModel = Teams;

  public teams = async (): Promise<ResponseDto> => {
    const team = await this._teamModel.findAll() as Teams[];
    return { code: 200, data: team };
  };

  public team = async (id: string): Promise<ResponseDto> => {
    const team = await this._teamModel.findByPk(id) as Teams;
    if (!team) { return { code: 400, data: { erro: 'id não encontrado' } }; }
    return { code: 200, data: team };
  };
}