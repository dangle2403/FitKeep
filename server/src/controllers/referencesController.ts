import { PrismaClient } from "../../generated/prisma_client/index.js";
import type { Request, Response, NextFunction } from "express";
import { findUserById } from "../utils/userId.js";

const prisma = new PrismaClient();

export const getReferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }

    let reference = await prisma.userPreference.findUnique({
      where: { userId },
    });
    if (!reference) {
      // Create default preference if not exists
      reference = await prisma.userPreference.create({
        data: { userId },
      });
    }
    res.status(200).json({ success: true, data: reference });
  } catch (error) {
    next(error);
  }
};

export const updateReferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = findUserById(req, res);
    if (!userId) {
      return;
    }
    const { viewType } = req.body;
    if (!viewType) {
      return res.status(400).json({
        success: false,
        message: "viewType is required",
      });
    }
    const reference = await prisma.userPreference.findFirst({
      where: { userId },
    });
    if (!reference) {
      return res.status(404).json({
        success: false,
        message: "User preferences not found",
      });
    }
    const updatedReference = await prisma.userPreference.update({
      where: { id: reference.id },
      data: { viewType: viewType },
    });
    res.status(200).json({
      success: true,
      data: updatedReference,
    });
  } catch (error) {
    next(error);
  }
};
