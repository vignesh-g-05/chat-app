import express from "express";
import {
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/message.controller";
import { authenticate } from "../middlewares/auth.middleware";

const chatRouter = express.Router();

chatRouter.get("/", authenticate, getChats);
chatRouter.get("/:chatId", authenticate, getMessages);
chatRouter.post("/", authenticate, sendMessage);

export default chatRouter;
