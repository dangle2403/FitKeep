import Router from "express";

const exerciseRouter = Router();

exerciseRouter.post("/"); // Create a new exercise
exerciseRouter.patch("/:id "); // Update an existing exercise
exerciseRouter.delete("/:id "); // Delete an exercise
exerciseRouter.get("/"); // Get all exercises
exerciseRouter.get("/:id "); // Get a specific exercise by ID

export default exerciseRouter;
