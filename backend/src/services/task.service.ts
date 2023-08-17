import { ServiceResponse } from "../interfaces/ServiceResponse";
import ITask from "../interfaces/Tasks/Task";
import { NewEntity } from "../interfaces/User/UserModel";
import TaskModel from "../models/TaskModel";

export default class TaskService {
  constructor (
    private taskModel = new TaskModel(),
  ) { };

  public async getTasksAll(userId : number) : Promise<ServiceResponse<ITask[]>> {
    const tasks = await this.taskModel.getTasksAll(userId);
    return { status: 'SUCCESSFUL', data: tasks };
  }

  public async createTask(data : NewEntity<ITask>) : Promise<ServiceResponse<ITask>> {
    const newTask = await this.taskModel.createTask(data);
    return { status: 'SUCCESSFUL', data: newTask };
  }
}