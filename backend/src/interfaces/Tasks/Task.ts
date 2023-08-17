export default interface ITask {
  id: number;
  userId: number;
  description: string;
  data: Date;
  completed: boolean;
}