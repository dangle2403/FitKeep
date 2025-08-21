import Router from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController.js";

const exerciseRouter = Router();

// Apply auth middleware to all routes
exerciseRouter.use(requireAuth);

exerciseRouter.post("/", createExercise); // create a new exercise for a schedule
exerciseRouter.patch("/:id", updateExercise); // update an exercise
exerciseRouter.delete("/:id", deleteExercise); // remove exercise from schedule
exerciseRouter.get("/", getExercises); // list all exercises in that schedule
exerciseRouter.get("/:id", getExerciseById); // Get details of one exercise

export default exerciseRouter;
