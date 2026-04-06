import authRouter from "./routes/auth.router";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.router";
import chatRouter from "./routes/message.router";

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
app.use("/messages", chatRouter);

export default app;
