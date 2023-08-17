import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";
import UserService from "../services/user.service";

export default class UserController {
  constructor (
    private userService = new UserService(),
  ) { }

  public async createUser(req : Request, res : Response) {
    const user = req.body;

    const newUser = await this.userService.createUser(user);
    if (newUser.status !== 'SUCCESSFUL' && newUser.status !== 'CREATED') {
      return res.status(mapStatusHTTP(newUser.status)).json(newUser.data);
    }

    return res.status(mapStatusHTTP(newUser.status)).json(newUser.data);
  }
}