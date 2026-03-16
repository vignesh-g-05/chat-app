import { db } from "../config/db";
import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";
import { User } from "../types/user";
import { RowDataPacket } from "mysql2";

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
    const hashedPassword = await hash(password, 10);
    const query =
      "INSERT INTO users(id, username, email, password) VALUES (?, ?, ?, ?)";
    await db.query(query, [id, username, email, hashedPassword]);
    return { id, username, email, password: hashedPassword };
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

export async function getUserByEmail(email: string) {
  try {
    const query = "SELECT * FROM users WHERE email=?";
    const [user] = await db.query<(User & RowDataPacket)[]>(query, [email]);
    return user[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
