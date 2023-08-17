import { ServiceResponse } from "../interfaces/ServiceResponse";
import IUser from "../interfaces/User/User";
import { NewEntity } from "../interfaces/User/UserModel";
import UserModel from "../models/UserModel";

export default class UserService {
  constructor (
    private userModel = new UserModel()
  ) { }

  public async createUser(user : NewEntity<IUser>) : Promise<ServiceResponse<IUser>> {
    const foundUser = await this.userModel.findByEmail(user.email);

    if (foundUser !== null) return { status: 'CONFLICT', data: { message: 'User already registered' } };

    const newUser = await this.userModel.createUser(user);
    return { status: 'CREATED', data: newUser };
  }
}