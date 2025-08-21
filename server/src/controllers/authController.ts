import { PrismaClient } from "../../generated/prisma_client/index.js";

const prisma = new PrismaClient();

export const auth = async (req, res) => {
  console.log("Auth function called", req.method, req.url);

  // 1. Handle OAuth here (better-auth or manual)
  // 2. Extract user info from provider
  const email = req.body.email; // placeholder
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({ data: { email, name: req.body.name } });
  }

  console.log("User created/found:", user);

  res.status(200).json({ message: "Auth successful", user });
};