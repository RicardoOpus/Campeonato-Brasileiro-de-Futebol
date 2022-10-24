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
    if (!user) return null;
    const passwordHash = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordHash) {
      return null;
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
    return { token };
  }
}

export default LoginService;
