import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  patchUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", patchUser); 
userRouter.delete("/:id", deleteUser);

export default userRouter;
