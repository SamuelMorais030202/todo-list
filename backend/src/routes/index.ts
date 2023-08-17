import { Router } from "express";
import loginRouter from './login.routes';
import userRouter from "./user.routes";
import taskRouter from "./task.routes";

const router = Router();

router.use(loginRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);

export default router;