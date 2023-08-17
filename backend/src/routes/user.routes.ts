import { Router, Request, Response } from "express";
import Authorized from "../middlewares/Authorized";
import UserController from "../controllers/user.controller";
import Validations from "../middlewares/Validations";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  '/',
  Authorized,
  (req : Request, res : Response) => userController.getUserById(req, res),
);

userRouter.post(
  '/',
  Validations.validateNewUser,
  (req : Request, res : Response) => userController.createUser(req, res),
);

userRouter.put(
  '/',
  Authorized,
  Validations.validateNewUser,
  (req : Request, res : Response) => userController.updateUser(req, res),
);

export default userRouter;