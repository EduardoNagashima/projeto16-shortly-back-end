import { Router } from "express";

import { signup, signin } from "./../controllers/authController.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";
const authRouter = Router();

authRouter.post('/signup', validationMiddleware,  signup);
authRouter.post('/signin', signin);

export default authRouter;