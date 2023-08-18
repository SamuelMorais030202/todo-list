import { ITask } from "./ITask";

export interface IListTasks {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<never[]>>;
}