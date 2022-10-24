import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import LoginDto from './dto/LoginDto';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async auth(req: Request<unknown, unknown, LoginDto>, res: Response) {
    const { code, data } = await this.loginService.authentication(req.body);
    return res.status(code).json(data);
  }
}

export default LoginController;
