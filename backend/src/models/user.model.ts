import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { User } from "../types/user";

export const findAllUsers = async () => {
  const query = "SELECT id,username,email FROM users";
  const [users] = await db.execute<(User & RowDataPacket)[]>(query);
  return users;
};
