import ITask from "./Task";

export interface ITaskModel {
  createTask(task : Partial<ITask>) : Promise<ITask>;
  getTasksAll(userId : number) : Promise<ITask[]>;
  // getTaskCompleted(completed : ITask['completed']) : Promise<ITask[]>;
}