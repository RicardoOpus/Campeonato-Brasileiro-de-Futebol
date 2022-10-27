import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';

const SECRET = process.env.SECRET || 'jwt_secret';

class ValidateToken {
  constructor(private jwtConfig?: SignOptions) {}

  public verify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: 'Authorization needs a token' });
    }
    next();
  };

  public async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: 'No token' });
    }

    try {
      await jwt.verify(token, SECRET, this.jwtConfig) as IJWTHeaderDto;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default ValidateToken;
