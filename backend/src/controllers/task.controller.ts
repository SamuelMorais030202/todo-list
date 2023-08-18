import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";
import TaskService from "../services/task.service";
import ITask from "../interfaces/Tasks/Task";

export default class TaskController {
  constructor (
    private taskService = new TaskService(),
  ) { }

  public async getTasksAll(_req : Request, res : Response) {
    const userId = Number(res.locals.userId);
    const { data, status } = await this.taskService.getTasksAll(userId);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getTaskByCompleted(req : Request, res : Response) {
    const userId = Number(res.locals.userId);
    const completed = JSON.parse(req.params.completed);

    const { data, status } = await this.taskService.getTaskByCompleted(userId, completed);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createTask(req : Request, res : Response) {
    const { description, completed, data } = req.body;
    const userId = Number(res.locals.userId);

    const response = await this.taskService.createTask({ userId, description, completed, data});

    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async updateTask(req : Request, res : Response) {
    const { description, completed, data, id } = req.body;
    const userId = Number(res.locals.userId);

    const response = await this.taskService.updateTask(Number(id), { description, completed, data, userId });

    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async deleteTask(req : Request, res : Response) {
    const { id } = req.params;
    const { data, status } = await this.taskService.deleteTask(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }
}