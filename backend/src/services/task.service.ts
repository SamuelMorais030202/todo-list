import { ServiceMessage, ServiceResponse } from "../interfaces/ServiceResponse";
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

  public async getTaskByCompleted(userId : number, completed : ITask['completed'])
  : Promise<ServiceResponse<ITask[]>> {
    const tasks = await this.taskModel.getTaskByCompleted(completed, userId);
    if (tasks === null) {
      return { status: 'CONFLICT', data: { message: 'Unable to list tasks' } }
    }

    return { status: 'SUCCESSFUL', data: tasks };
  }

  public async createTask(data : NewEntity<ITask>) : Promise<ServiceResponse<ITask>> {
    const newTask = await this.taskModel.createTask(data);
    return { status: 'SUCCESSFUL', data: newTask };
  }

  public async updateTask(id : number, data: NewEntity<ITask>) : Promise<ServiceResponse<ITask>> {
    const foundTask = await this.taskModel.getTaskById(id);
    if (!foundTask) {
      return { status: 'NOT_FOUND', data: { message: 'Task not found' } };
    }

    const uptadeTask = await this.taskModel.updateTask(id, data);
    if (uptadeTask === null) {
      return {
        status: 'CONFLICT',
        data: {
          message: `There are no update to perform in Task ${id}`,
        },
      }
    }

    return { status: 'SUCCESSFUL', data: uptadeTask };
  }

  public async deleteTask(id : number) : Promise<ServiceResponse<ServiceMessage>> {
    const foundTask = await this.taskModel.getTaskById(id);
    if (foundTask === null) return { status: 'NOT_FOUND', data: { message: 'Task not found' } };

    await this.taskModel.deleteTask(id);
    return { status: 'SUCCESSFUL', data: { message: 'Task deleted successfully' } };
  }
}