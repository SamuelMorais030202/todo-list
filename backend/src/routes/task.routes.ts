import { Router, Request, Response } from "express";
import TaskController from "../controllers/task.controller";
import Authorized from "../middlewares/Authorized";
import Validations from "../middlewares/Validations";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get(
  '/',
  Authorized,
  (req : Request, res : Response) => taskController.getTasksAll(req, res),
);

taskRouter.get(
  '/:completed',
  Authorized,
  (req : Request, res : Response) => taskController.getTaskByCompleted(req, res),
);
 
taskRouter.post(
  '/',
  Authorized,
  Validations.validateTasks,
  (req : Request, res : Response) => taskController.createTask(req, res),
);

taskRouter.put(
  '/',
  Authorized,
  Validations.validateId,
  Validations.validateTasks,
  (req : Request, res : Response) => taskController.updateTask(req, res),
);

taskRouter.delete(
  '/:id',
  Authorized,
  (req : Request, res : Response) => taskController.deleteTask(req, res),
);

export default taskRouter;