import { Router, Request, Response } from 'express';
import LoginController from './controllers/LoginController';
import LoginMiddleware from './middlewares/EmailPassword';
import ValidateController from './controllers/ValidateController';
import ValidateToken from './middlewares/ValidateToken';

const routes: Router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();
const validateController = new ValidateController();
const validateToken = new ValidateToken();

routes.post(
  '/login',
  loginMiddleware.verify,
  (req: Request, res: Response) => loginController.auth(req, res),
);
routes.get(
  '/login/validate',
  validateToken.verify,
  (req: Request, res: Response) => validateController.validate(req, res),
);

export default routes;
