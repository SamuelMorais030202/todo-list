import { Router } from "express";
import loginRouter from './login.routes';

const router = Router();

router.use(loginRouter);

export default router;