import { authenticate } from "../middlewares/auth.middleware";
import express from "express";
import { sendMessage } from "../controllers/messages.controller";

const messagesRouter = express.Router();

messagesRouter.post("/", authenticate, sendMessage);

export default messagesRouter;
