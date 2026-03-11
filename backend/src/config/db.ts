import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Vicky@2805",
  database: "chat_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
