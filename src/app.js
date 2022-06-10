import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import userRouter from "./routers/userRouter.js";
import urlRouter from "./routers/urlRouter.js";
import authRouter from "./routers/authRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(urlRouter);
app.use(authRouter);

app.listen(process.env.PORT);