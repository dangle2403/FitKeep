import { PrismaClient } from "../../generated/prisma_client/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Failed to fetch users", error);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Failed to fetch user", error);
    next(error);
  }
};

export const patchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Build the update object with only allowed fields
    const dataToUpdate = {};

    // Only allow name and email updates (no password without auth)
    if (name !== undefined) {
      dataToUpdate.name = name;
    }
    if (email !== undefined) {
      dataToUpdate.email = email;
    }

    // Check if any valid fields were provided
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No valid fields provided for update. Only 'name' and 'email' are allowed.",
      });
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: dataToUpdate,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Failed to patch user", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete user", error);
    next(error);
  }
};
