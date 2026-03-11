import express from "express";
import { db } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  const [users] = await db.query("SELECT * FROM users");
  return res.json({
    rows: users,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
