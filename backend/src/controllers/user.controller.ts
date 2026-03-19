import { Request, Response } from "express";
import { findAllUsers } from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    return res.json({
      success: true,
      message: "successfully fetched users",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unexpected error occured",
      data: null,
    });
  }
};
