import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const userCount = await prisma.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database."
  );
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});