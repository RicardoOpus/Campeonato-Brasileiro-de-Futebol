import { Request, Response, NextFunction } from 'express';

class LoginMiddleware {
  public verify = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegEx.test(email)) {
      return res.status(400).json({ message: 'Inset a valid email' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'password is too short' });
    }
    next();
  };
}

export default LoginMiddleware;
