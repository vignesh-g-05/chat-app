import { Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import { createUser, getUserByEmail } from "../middlewares/auth.model";
import { UserBase, UserRegister } from "../types/user";
import { compare } from "bcrypt";

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

export const loginUser = async (
  req: Request<{}, {}, UserBase>,
  res: Response,
) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "missing required fields",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "invalid credentials",
      data: null,
    });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
      data: null,
    });
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    return res.json({
      success: false,
      message: "invalid credentials",
      data: null,
    });
  }

  return res.json({
    success: true,
    message: "logged in successfully",
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};
