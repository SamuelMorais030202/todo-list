import { Request, Response, Router } from "express";
import Authorized from "../middlewares/Authorized";
import LoginController from "../controllers/Login.controller";
import Validations from "../middlewares/Validations";

const loginRouter = Router();
const login = new LoginController();

loginRouter.post(
  '/login',
  Validations.validateLogin,
  (req : Request, res : Response) => login.login(req, res),
);

loginRouter.get(
  '/login/autehticated',
  Authorized,
  (req : Request, res : Response) => login.authenticated(req, res),
);

export default loginRouter;