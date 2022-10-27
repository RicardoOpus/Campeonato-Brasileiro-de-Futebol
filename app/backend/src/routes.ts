import { Router, Request, Response } from 'express';
import LoginController from './controllers/LoginController';
import LoginMiddleware from './middlewares/EmailPassword';
import ValidateController from './controllers/ValidateController';
import ValidateToken from './middlewares/ValidateToken';
import TeamController from './controllers/TeamController';
import MatchController from './controllers/MatchController';

const routes: Router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();
const validateController = new ValidateController();
const validateToken = new ValidateToken();
const teamController = new TeamController();
const matchController = new MatchController();

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
routes.get('/teams', (req: Request, res: Response) => teamController.allTeams(req, res));
routes.get('/teams/:id', (req: Request, res: Response) => teamController.oneTeam(req, res));
routes.get('/matches', (req: Request, res: Response) => matchController.matches(req, res));
routes.post(
  '/matches',
  validateToken.authenticateToken,
  (req: Request, res: Response) => matchController.crateMatches(req, res),
);
routes.patch(
  '/matches/:id/finish',
  (req: Request, res: Response) => matchController.editMatches(req, res),
);
routes.patch(
  '/matches/:id',
  (req: Request, res: Response) => matchController.updateMatches(req, res),
);

export default routes;
