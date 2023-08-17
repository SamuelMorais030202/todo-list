import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";
import UserService from "../services/user.service";

export default class UserController {
  constructor (
    private userService = new UserService(),
  ) { }

  public async getUserById(_req : Request, res : Response) {
    const id = Number(res.locals.userId);
    const user = await this.userService.getUserById(id);

    return res.status(mapStatusHTTP(user.status)).json(user.data);
  }

  public async createUser(req : Request, res : Response) {
    const user = req.body;
    const newUser = await this.userService.createUser(user);
  
    return res.status(mapStatusHTTP(newUser.status)).json(newUser.data);
  }

  public async updateUser(req : Request, res : Response) {
    const data = req.body;
    const id = Number(res.locals.userId);

    const update = await this.userService.updateUser(id, data);
    return res.status(mapStatusHTTP(update.status)).json(update.data);
  }
}