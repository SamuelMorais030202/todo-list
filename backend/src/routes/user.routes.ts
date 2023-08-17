import { Router, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import Validations from "../middlewares/Validations";

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  Validations.validateNewUser,
  (req : Request, res : Response) => userController.createUser(req, res),
);

export default userRouter;