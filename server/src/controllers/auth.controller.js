import { PrismaClient } from "../../generated/prisma_client/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const signUp = async (req, res, next) => {
  try {
    // destructure information from request body
    const { email, password, name } = req.body;

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name || null,
      },
    });

    // omit password from response
    const { password: _pw, ...publicUser } = newUser;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: publicUser,
    });
  } catch (error) {
    console.error("Sign up failed", error);
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    // check if password is valid
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    // ensure server has a JWT secret
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ success: false, message: "Server misconfigured (missing JWT_SECRET)" });
    }
    // generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _pw2, ...publicUser } = user;
    res.status(200).json({ success: true, message: "Login successful", data: publicUser, token });
  } catch (error) {
    console.error("Login failed", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Failed to logout", error);
    next(error);
  }
};
