import { Request, Response, NextFunction } from 'express';

class ValidateToken {
  public verify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: 'Authorization needs a token' });
    }
    next();
  };
}

export default ValidateToken;
