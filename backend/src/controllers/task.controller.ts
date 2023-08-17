import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";
import TaskService from "../services/task.service";

export default class TaskController {
  constructor (
    private taskService = new TaskService(),
  ) { }

  public async getTasksAll(_req : Request, res : Response) {
    const userId = Number(res.locals.userId);
    const { data, status } = await this.taskService.getTasksAll(userId);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createTask(req : Request, res : Response) {
    const { description, completed, data } = req.body;
    const userId = Number(res.locals.userId);

    const response = await this.taskService.createTask({ userId, description, completed, data});

    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}

// "description": "Lavar casa",
// "completed": false,
// "data": "18/09/2023"