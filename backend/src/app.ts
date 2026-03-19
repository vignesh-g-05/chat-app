import express from "express";
import authRouter from "./routes/auth.router";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", userRouter);

export default app;
