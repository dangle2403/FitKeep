import { PrismaClient } from "../../generated/prisma_client/index.js";
import type { Request, Response, NextFunction } from "express";
import { findUserById } from "../utils/userId.js";

const prisma = new PrismaClient();

export const getAllLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "startDate and endDate are required",
      });
    }

    // Convert to Date objects
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    // Fetch logs for the user within the date range
    const logs = await prisma.exerciseLog.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date: "asc" }, // optional: order by date
    });
    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

export const getLogsByExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    const { exerciseId } = req.params;
    if (!exerciseId) {
      return res.status(400).json({
        success: false,
        message: "exerciseId is required",
      });
    }
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "startDate and endDate are required",
      });
    }
    // Convert to Date objects
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    // Fetch logs for the specific exercise within the date range
    const logs = await prisma.exerciseLog.findMany({
      where: {
        userId,
        scheduleExerciseId: exerciseId,
        date: {
          gte: start,
          lte: end,
        }
      },
      orderBy: { date: "asc" }, // optional: order by date
    })
    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};
