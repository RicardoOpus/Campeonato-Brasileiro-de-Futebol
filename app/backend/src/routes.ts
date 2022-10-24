import { Router, Request, Response } from 'express';
import LoginController from './controllers/LoginController';
import LoginMiddleware from './middlewares/EmailPassword';
import ValidateController from './controllers/ValidateController';
import ValidateToken from './middlewares/ValidateToken';
import TeamController from './controllers/teamController';

const routes: Router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();
const validateController = new ValidateController();
const validateToken = new ValidateToken();
const teamController = new TeamController();

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
routes.get('/teams', teamController.allTeams);
routes.get('/teams/:id', teamController.oneTeam);

export default routes;
