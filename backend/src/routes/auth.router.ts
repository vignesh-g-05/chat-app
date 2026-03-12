import express from "express";
import { registerUser } from "../controllers/user.controller";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

export default authRouter;
