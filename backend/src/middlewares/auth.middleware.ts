import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../models/auth.model";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken } = req.cookies || {};

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
        data: null,
      });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as {
      id?: string;
    };
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
        data: null,
      });
    }

    const user = await getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
        data: null,
      });
    }
    res.locals.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "invalid or expired token",
      data: error.message,
    });
  }
};
