import { db } from "../config/db";
import { v4 as uuid } from "uuid";

export async function createUser({
  email,
  password,
  username,
}: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const id = uuid();
    const query =
      "INSERT INTO users(id, username, email, password) VALUES (?, ?, ?, ?)";
    const result = await db.query(query, [id, username, email, password]);
    return { id, username, email, password };
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      if (error.sqlMessage.includes("username")) {
        return "username already exists";
      }

      if (error.sqlMessage.includes("email")) {
        return "email already exists";
      }
    }
    throw error;
  }
}
