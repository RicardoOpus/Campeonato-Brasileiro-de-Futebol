import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import LoginDto from './dto/LoginDto';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async auth(req: Request<unknown, unknown, LoginDto>, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const token = await this.loginService.authentication(req.body);
      // console.log('essssse');
      if (!token) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      return res.status(200).json(token);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno' });
    }
  }
}

export default LoginController;
