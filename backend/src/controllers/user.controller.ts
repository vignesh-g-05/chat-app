import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "missing required fields",
      data: null,
    });
  }

  return res.status(201).json({
    success: true,
    message: "user registered successfully",
    data: {
      username,
      email,
      password,
    },
  });
};
