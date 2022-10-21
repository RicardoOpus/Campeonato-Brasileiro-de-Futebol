import { Router, Request, Response } from 'express';
import LoginController from './controllers/LoginController';

const routes: Router = Router();

const loginController = new LoginController();

routes.post('/login', (req: Request, res: Response) => loginController.auth(req, res));

export default routes;
