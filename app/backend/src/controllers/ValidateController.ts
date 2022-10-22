import { Request, Response } from 'express';
import ValidateService from '../services/ValidateService';
import LoginDto from './dto/LoginDto';

class ValidateController {
  private validateService: ValidateService;

  constructor() {
    this.validateService = new ValidateService();
  }

  public async validate(req: Request<unknown, unknown, LoginDto>, res: Response) {
    const { authorization: token } = req.headers;
    const { code, data } = await this.validateService.findRole(token as string);
    return res.status(code).json(data);
  }
}

export default ValidateController;
