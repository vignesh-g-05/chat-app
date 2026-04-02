import { Request } from "express";

export type UserBase = {
  email: string;
  password: string;
};

export type UserRegister = UserBase & {
  username: string;
};

export type User = UserBase & {
  id: string;
  username: string;
};

export type AuthenticatedRequest = Request & {
  user: User;
};
