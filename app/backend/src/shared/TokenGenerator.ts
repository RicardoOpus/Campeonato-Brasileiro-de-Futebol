import { SignOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';

const SECRET = process.env.SECRET || 'jwt_secret';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '15m',
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

  public async authenticateToken(req: Request, res: Response, token: string) {
    if (!token) {
      return res.status(400).json({ message: 'Sem token' });
    }

    try {
      const introspection = await jwt.verify(token, SECRET, this.jwtConfig) as IJWTHeaderDto;
      return introspection;
    } catch (e) {
      return res.status(400).json({ message: 'Token inválido' });
    }
  }
}

export default TokenGenerator;
