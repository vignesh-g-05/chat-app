import { Request, Response } from "express";

export const sendMessage = (req: Request, res: Response) => {
  return res.json(req.user);
};
