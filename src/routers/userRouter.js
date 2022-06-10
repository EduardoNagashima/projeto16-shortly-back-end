import {Router} from "express";

import {getUsers, getRanking} from "./../controllers/userController.js";
import {authMiddleware} from "./../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get('/users/:id', authMiddleware, getUsers);
userRouter.get('/ranking', getRanking);

export default userRouter;