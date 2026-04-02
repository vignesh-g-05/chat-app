import authRouter from "./routes/auth.router";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import messagesRouter from "./routes/messages.router";
import userRouter from "./routes/user.router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/messages", messagesRouter);

export default app;
