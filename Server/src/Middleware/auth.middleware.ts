import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../Models/user.model";
import { TokenInterface } from "../Lib/token";

class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = "CustomError";
  }
}

interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export default async function authCheck(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { accesstoken } = req.cookies;
    if (!accesstoken) {
      throw new CustomError("Unauthorized", 401);
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new CustomError("Some error occurred", 500);
    }

    const decodeToken = jwt.verify(accesstoken, secret);

    const { userId } = decodeToken as TokenInterface;

    const findUser = await User.findById(userId);
    if (!findUser) {
      throw new CustomError("Unauthorized", 401);
    }

    req.user = findUser;
    next();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Auth error: ", error);
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token expired",
        refresh: true,
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid or malformed Token",
        refresh: false,
      });
    }

    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message,
      refresh: false,
    });
  }
}
