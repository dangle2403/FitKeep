import { PrismaClient } from "../../generated/prisma_client/index.js";
import type { Request, Response, NextFunction } from "express";
import { findUserById } from "../utils/userId.js";

const prisma = new PrismaClient();

// Create a new schedule
export const createSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    const { date, exercises } = req.body;
    const newSchedule = await prisma.schedule.create({
      data:{
        date: new Date(date),
        userId: userId,
      },
      include: {
        exercises: true, // Include related exercises
      },
    })
    res.status(201).json({
      success: true,
      data: newSchedule,
    });
  } catch (error) {
    next(error);
  }
};
// Get all schedules for a user
export const getAllSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    const schedules = await prisma.schedule.findMany({
      where: {
        userId: userId,
      },
      include:{
        exercises: true, // Include related exercises
      },
      orderBy: {
        date: 'asc',
      },
    });
    res.status(200).json({
      success: true,
      data: schedules,
    });
  } catch (error) {
    next(error);
  }
};
// Get a specific schedule by ID
export const getScheduleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    
    const scheduleId = req.params.id;
    if (!scheduleId) {
      return res.status(400).json({
        success: false,
        message: "Schedule ID is required",
      });
    }
    
    const schedule = await prisma.schedule.findFirst({
      where: {
        id: scheduleId,
        userId: userId,
      },
      include: {
        exercises: true, // Include related exercises
      },
    });
    
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }
    
    res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    next(error);
  }
};

