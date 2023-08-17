import IUser from './User';

export interface IUserModel {
  findByEmail(email : IUser['email']) : Promise<IUser | null>;
  findById(id : IUser['id']) : Promise<IUser | null>;
  createUser(user : Partial<IUser>) : Promise<IUser>;
  updateUser(id : IUser['id'], data: Partial<NewEntity<IUser>>) : Promise<IUser | null>;
}

export type NewEntity<T> = Omit<T, 'id'>;

export interface ILogin {
  email: string;
  password: string;
}