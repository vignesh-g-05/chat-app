import express from "express";
import { getUsers } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);

export default userRouter;
