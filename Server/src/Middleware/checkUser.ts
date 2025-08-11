import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/user.model";
import { TokenInterface } from "../Lib/token";
import { AuthenticatedRequest } from "./auth.middleware";

class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export const checkResetToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resetToken } = req.cookies;
    console.log(resetToken);

    const resetSecret = process.env.JWT_RESET_TOKEN;
    if (!resetSecret) {
      throw new CustomError("Reset Secret not found", 400);
    }
    const decodedToken = jwt.verify(resetToken, resetSecret);
    const { userId } = decodedToken as TokenInterface;
    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError("User Not found", 400);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message || "Server error",
    });
  }
};
