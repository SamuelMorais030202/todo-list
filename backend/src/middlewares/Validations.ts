import { Request, Response, NextFunction } from "express";
import IUser from "../interfaces/User/User";
import { ILogin, NewEntity } from "../interfaces/User/UserModel";

export default class Validations {
  private static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
  private static passwordMinLength = 4;
  private static fullNameMinLength = 5;

  static validateLogin(req : Request, res : Response, next : NextFunction)
  : Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must a be filled' });
    }

    if(!Validations.emailRegex.test(email) || Validations.passwordMinLength > password.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  };

  static validateNewUser(req : Request, res : Response, next : NextFunction)
  : Response | void {
    const { fullName, email, password, phone } = req.body as NewEntity<IUser>;
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields must a be filled' });
    }

    if (!Validations.emailRegex.test(email)) {
      return res.status(401).json({ message: 'Email invalid' });
    }

    if (fullName.length < Validations.fullNameMinLength) {
      return res.status(401).json({ message: 'Full name must be at least 5 letters long' });
    }

    if (password.length < Validations.passwordMinLength) {
      return res.status(401).json({ message: 'Password must be at least 4 letters long' });
    }

    if (!Validations.phoneRegex.test(phone)) {
      return res.status(401).json({ message: 'Invalid cell phone format' });
    }

    next();
  }
}