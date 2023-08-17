import { Request, Response, NextFunction } from "express";
import { ILogin } from "../interfaces/User/UserModel";

export default class Validations {
  private static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static passwordMinLength = 4;

  static validateLogin(req : Request, res : Response, next : NextFunction) : Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must a be filled' });
    }

    if(!Validations.emailRegex.test(email) || Validations.passwordMinLength > password.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}