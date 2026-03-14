import { Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import { createUser } from "../middlewares/auth.model";
import { UserRegister } from "../types/user";

export const registerUser = async (
  req: Request<{}, {}, UserRegister>,
  res: Response,
) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "missing required fields",
        data: null,
      });
    }

    if (!isEmail(email) || username.length <= 3 || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
        data: null,
      });
    }

    const result = await createUser({
      username,
      email,
      password,
    });

    console.log(result);

    if (typeof result === "string") {
      return res.status(400).json({
        success: false,
        message: result,
        data: null,
      });
    }

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
    });
  }
};
