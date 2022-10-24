import * as bcrypt from 'bcryptjs';
import TokenGenerator from '../shared/TokenGenerator';
import LoginDto from '../controllers/dto/LoginDto';
import User from '../database/models/users';

import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';

class LoginService {
  private _userModel: typeof User;
  constructor() {
    this._userModel = User;
  }

  public async authentication(loginDto: LoginDto) {
    const user = await this._userModel.findOne({
      where: { email: loginDto.email },
    });
    if (!user) return { code: 401, data: { message: 'Incorrect email or password' } };
    const passwordHash = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordHash) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }
    // Gera o token
    const jwtHeader: IJWTHeaderDto = {
      username: user.username,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    const tokenGenerator = new TokenGenerator();
    const token = tokenGenerator.generateJWTToken(jwtHeader);
    return { code: 200, data: { token } };
  }
}

export default LoginService;
