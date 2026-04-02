import { NextFunction, Request, Response } from "express";

import { getUserById } from "../models/auth.model";
import jwt from "jsonwebtoken";

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
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "invalid or expired token",
      data: error.message,
    });
  }
};
