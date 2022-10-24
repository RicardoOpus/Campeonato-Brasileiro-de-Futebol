import * as jwt from 'jsonwebtoken';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';

class ValidateService {
  private jwt: typeof jwt;
  constructor() {
    this.jwt = jwt;
  }

  public async findRole(token: string) {
    try {
      const { role } = await this.jwt
        .verify(token, process.env.JWT_SECRET as string) as IJWTHeaderDto;
      return { code: 200, data: { role } };
    } catch (error) {
      return { code: 400, data: { message: 'invalid token' } };
    }
  }
}

export default ValidateService;
