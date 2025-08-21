import { PrismaClient } from "../../generated/prisma_client/index.js";
import type { Request, Response, NextFunction } from "express";
import { findUserById } from "../utils/userId.js";

const prisma = new PrismaClient();
// create a new exercise for a schedule
export const createExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, sets, reps, weight, restTime, scheduleId } = req.body;

    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    if (!name || !scheduleId) {
      return res.status(400).json({
        success: false,
        message: "Name and Schedule ID are required",
      });
    }
    if (!reps || !sets){
      return res.status(400).json({
        success: false,
        message: "Reps and Sets are required",
      });
    }
    // Verify schedule exists and belongs to user
    const schedule = await prisma.schedule.findFirst({
      where: {
        id: scheduleId,
        userId: userId,
      },
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    // Create the exercise
    const newExercise = await prisma.scheduleExercise.create({
      data: {
        name,
        description: description || "",
        sets: sets ?? 0,
        reps: reps ?? 0,
        weight: weight ?? 0,
        restTime: restTime ?? 0,
        scheduleId: scheduleId,
        userId: userId,
      },
    });

    // Create initial log entry
    await prisma.exerciseLog.create({
      data: {
        scheduleExerciseId: newExercise.id, 
        userId: userId,
        date: new Date(),
        sets: sets ?? 0,
        reps: reps ?? 0,
        weight: weight ?? 0,
        restTime: restTime ?? 0,
      },
    });
    
    res.status(201).json({
      success: true,
      data: newExercise,
    });
  } catch (error) {
    next(error);
  }
};
// Get all exercises for a specific schedule
export const getExercises = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = findUserById(req, res);
    
    if (!userId) {
      return;
    }

    const exercises = await prisma.scheduleExercise.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      data: exercises,
    });
  } catch (error) {
    next(error);
  }
};
// Get a specific exercise by ID
export const getExerciseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exerciseId = req.params.id;
    const scheduleId = req.params.scheduleId;
    const userId = findUserById(req, res);
    
    if (!userId) {
      return;
    }

    if (!exerciseId || !scheduleId) {
      return res.status(400).json({
        success: false,
        message: "Exercise ID and Schedule ID are required",
      });
    }

    // Verify schedule belongs to user
    const schedule = await prisma.schedule.findFirst({
      where: {
        id: scheduleId,
        userId: userId,
      },
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    const exercise = await prisma.scheduleExercise.findFirst({
      where: {
        id: exerciseId,
        scheduleId: scheduleId,
      },
    });

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    next(error);
  }
};
// Update an existing exercise
export const updateExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exerciseId = req.params.id;
    const scheduleId = req.params.scheduleId;
    const { name, description, sets, reps, weight, restTime } = req.body;

    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }

    if (!exerciseId || !scheduleId) {
      return res.status(400).json({
        success: false,
        message: "Exercise ID and Schedule ID are required",
      });
    }

    const exerciseExists = await prisma.scheduleExercise.findFirst({
      where: { id: exerciseId, scheduleId: scheduleId },
    });

    if (!exerciseExists) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }
    // update the exercise
    const updatedExercise = await prisma.scheduleExercise.update({
      where: { id: exerciseId },
      data: {
        name: name ?? exerciseExists.name,
        description: description ?? exerciseExists.description,
        sets: sets ?? exerciseExists.sets,
        reps: reps ?? exerciseExists.reps,
        weight: weight ?? exerciseExists.weight,
        restTime: restTime ?? exerciseExists.restTime,
      },
    });

    // Update exercise log (find the latest log and update it)
    const log = await prisma.exerciseLog.findFirst({
      where: {
        scheduleExerciseId: updatedExercise.id,
      },
    })
    if (!log) {
      return res.status(404).json({
        success: false,
        message: "No log entry found for this exercise",
      });
    }

    await prisma.exerciseLog.update({
      where: { id: log.id },
      data: {
        sets: sets ?? updatedExercise.sets,
        reps: reps ?? updatedExercise.reps,
        weight: weight ?? updatedExercise.weight,
        restTime: restTime ?? updatedExercise.restTime,
      }
    })

    res.status(200).json({
      success: true,
      data: updatedExercise,
    });
  } catch (error) {
    next(error);
  }
};
// Delete an exercise
export const deleteExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exerciseId = req.params.id;
    const scheduleId = req.params.scheduleId;
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    if (!exerciseId || !scheduleId) {
      return res.status(400).json({
        success: false,
        message: "Exercise ID and Schedule ID are required",
      });
    }
    // Verify schedule belongs to user
    const exerciseExists = await prisma.scheduleExercise.findFirst({
      where: { id: exerciseId, scheduleId: scheduleId },
    });

    if (!exerciseExists) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    await prisma.scheduleExercise.delete({
      where: { id: exerciseId },
    });

    const log = await prisma.exerciseLog.findFirst({
      where: {
        scheduleExerciseId: exerciseId,
      },
    });

    if (!log){
      return res.status(404).json({
        success: false,
        message: "No log entry found for this exercise",
      });
    }

    await prisma.exerciseLog.delete({
      where: { id: log.id },
    });

    res.status(200).json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
