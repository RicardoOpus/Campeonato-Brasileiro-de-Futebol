import * as jwt from 'jsonwebtoken';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';
import User from '../database/models/users';

class ValidateService {
  private _userModel: typeof User;
  private jwtMet: typeof jwt;
  constructor() {
    this._userModel = User;
    this.jwtMet = jwt;
  }

  // public async findRole(token: string) {
  //   console.log('chegou qui');
  //   const { email } = jwt.verify(token, process.env.JWT_SECRET as string) as IJWTHeaderDto;
  //   console.log(email);
  //   const user = await this._userModel.findOne({ where: { email } }) as User;

  //   if (!user) {
  //     return { code: 500, data: { role: 'algo deu errado' } };
  //   }
  //   return { code: 200, data: { role: user.role } };
  // }

  public async findRole(token: string) {
    const { role } = this.jwtMet.verify(token, process.env.JWT_SECRET as string) as IJWTHeaderDto;
    return { code: 200, data: { role } };
  }
}

export default ValidateService;
