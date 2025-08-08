import { Router } from "express";
import { signUp, logIn, logout } from "../controllers/auth.controller.js";
import { loginValidation, signupValidation } from "../utils/validation.js";

const authRouter = Router();

authRouter.post("/signup", signupValidation, signUp);
authRouter.post("/login", loginValidation, logIn);
authRouter.post("/logout", logout);

export default authRouter;
