import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "../generated/prisma_client/index.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";

const prisma = new PrismaClient();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
