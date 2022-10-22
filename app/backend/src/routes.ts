import { Router, Request, Response } from 'express';
import LoginController from './controllers/LoginController';
import LoginMiddleware from './middlewares/EmailPassword';
import ValidateController from './controllers/ValidateController';

const routes: Router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();
const validateController = new ValidateController();

routes.get(
  '/login/validate',
  (req: Request, res: Response) => validateController.validate(req, res),
);
routes.post(
  '/login',
  loginMiddleware.verify,
  (req: Request, res: Response) => loginController.auth(req, res),
);

export default routes;
