import type { Request, Response } from "express";

export const findUserById = (req: Request, res: Response): string | null => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return null;
  }
  return userId;
};
