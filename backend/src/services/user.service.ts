import { ServiceResponse } from "../interfaces/ServiceResponse";
import IUser from "../interfaces/User/User";
import { NewEntity } from "../interfaces/User/UserModel";
import UserModel from "../models/UserModel";

export default class UserService {
  constructor (
    private userModel = new UserModel()
  ) { }

  public async getUserById(id : IUser['id']) : Promise<ServiceResponse<IUser>> {
    const userId = await this.userModel.findById(id);
    if (userId === null) return { status: 'NOT_FOUND', data: { message: 'User not found' } };

    return { status: 'SUCCESSFUL', data: userId };
  }
 
  public async createUser(user : NewEntity<IUser>) : Promise<ServiceResponse<IUser>> {
    const foundUser = await this.userModel.findByEmail(user.email);

    if (foundUser !== null) return { status: 'CONFLICT', data: { message: 'User already registered' } };

    const newUser = await this.userModel.createUser(user);
    return { status: 'CREATED', data: newUser };
  }

  public async updateUser(id : IUser['id'], data: NewEntity<IUser>)
  : Promise<ServiceResponse<IUser>> {
    const foundUser = await this.userModel.findById(id);

    if (!foundUser) {
      return { status: 'CONFLICT', data: { message: 'User not found' } };
    }

    const updateUser = await this.userModel.updateUser(id, data);

    if (updateUser === null) {
      return {
        status: 'CONFLICT',
        data: {
          message: `There are no update to perform in User ${id}`
        },
      };
    }

    return { status: 'SUCCESSFUL', data: updateUser };
  }
}