import * as jwt from 'jsonwebtoken';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';

class ValidateService {
  private jwtMet: typeof jwt;
  constructor() {
    this.jwtMet = jwt;
  }

  public async findRole(token: string) {
    const { role } = this.jwtMet.verify(token, process.env.JWT_SECRET as string) as IJWTHeaderDto;
    return { code: 200, data: { role } };
  }
}

export default ValidateService;
