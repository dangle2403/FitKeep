import Router from "express";
import { getAllLog, getLogsByExercise } from "../controllers/logController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const logRouter = Router();

logRouter.use(requireAuth)

logRouter.get("/", getAllLog) // List all exercise logs (filter by date)
logRouter.get("/:exerciseId", getLogsByExercise) // Get a specific log entry by exercise ID

export default logRouter;
