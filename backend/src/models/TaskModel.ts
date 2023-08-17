import ITask from "../interfaces/Tasks/Task";
import SequelizeTasks from "../database/models/SequelizeTasks";
import { NewEntity } from "../interfaces/User/UserModel";
import { ITaskModel } from "../interfaces/Tasks/TaskModel";

export default class TaskModel implements ITaskModel {
  private model = SequelizeTasks;

  async createTask(data: NewEntity<ITask>): Promise<ITask> {
    const newTask = await this.model.create(data);
    return newTask;
  }

  async getTasksAll(userId : number): Promise<ITask[]> {
    const tasks = await this.model.findAll({ where: { userId } });
    return tasks;
  }
}