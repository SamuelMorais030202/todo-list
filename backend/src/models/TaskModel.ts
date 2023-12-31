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

  async getTaskById(id : ITask['id']) : Promise<ITask | null> {
    const task = await this.model.findByPk(id);
    if (task == null) return null;

    return task;
  }
 
  async getTaskByCompleted(completed : ITask['completed'], userId : ITask['userId']) : Promise<ITask[] | null> {
    const tasks = await this.model.findAll({ where: { userId, completed } });
    return tasks;
  }

  async updateTask(id : number, data: Partial<NewEntity<ITask>>) : Promise<ITask | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.getTaskById(id);
  }

  async deleteTask(id : number) : Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}