import Router from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getReferences, updateReferences } from "../controllers/referencesController.js";

const referencesRouter = Router();

referencesRouter.use(requireAuth)

referencesRouter.get("/", getReferences) // get user reference (default view by day)
referencesRouter.patch("/", updateReferences) // update user reference

export default referencesRouter;