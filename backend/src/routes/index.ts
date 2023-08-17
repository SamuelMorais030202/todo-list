import { Router } from "express";
import loginRouter from './login.routes';
import userRouter from "./user.routes";

const router = Router();

router.use(loginRouter);
router.use('/user', userRouter);

export default router;