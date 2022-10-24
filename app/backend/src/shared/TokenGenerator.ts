import { SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';

const SECRET = process.env.SECRET || 'jwt_secret';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfig = jwtDefaultConfig;
    }
  }

  public generateJWTToken(payload: IJWTHeaderDto) {
    return jwt.sign(payload, SECRET, this.jwtConfig);
  }
}

export default TokenGenerator;
