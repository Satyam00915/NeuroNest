import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../Models/user.model";
import generateTokens from "../Lib/generateTokens";
import { storeTokens } from "../Lib/storeTokens";
import { setCookies } from "../Lib/setCookies";
import { TokenInterface } from "../Lib/token";
import { redis } from "../Lib/redis";

class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = "CustomError";
  }
}

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      console.log("Duplicate user: " + userExists);
      return res.status(409).json({
        message: "User Already Exists",
        success: false,
      });
    }

    const user = await User.create({
      fullName,
      email,
      username,
      password,
    });

    //Authenticate

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeTokens(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        fullName,
        email,
        username,
      },
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error(`Error occurred!`, error);
    return res.status(500).json({
      message: "Some error occurred",
      error: (error as Error).message,
      success: false,
    });
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    if (!(await userExists.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const { accessToken, refreshToken } = generateTokens(userExists._id);
    await storeTokens(userExists._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.json({
      user: {
        fullName: userExists.fullName,
        email: userExists.email,
        username: userExists.username,
      },
      message: "Sign In successfull",
      success: true,
    });
  } catch (error) {
    console.error(`Error occurred during SignIn`, error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: (error as Error).message,
    });
  }
};

export const RefreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshtoken } = req.cookies;
    if (!refreshtoken) {
      throw new Error("Refresh Token not present");
    }

    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if (!REFRESH_TOKEN_SECRET) {
      throw new Error("Refresh token secret is not defined in env variables");
    }

    const decode = jwt.verify(refreshtoken, REFRESH_TOKEN_SECRET);

    const user = await User.findById((decode as TokenInterface).userId);
    if (!user) {
      throw new CustomError("Unauthorized", 401);
    }

    const redisToken = await redis.get(
      `refresh_token:user:${user._id.toString()}`
    );

    if (!(redisToken === refreshtoken)) {
      throw new Error("Unauthorized");
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeTokens(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Token refreshed Succesfully",
      success: true,
    });
  } catch (error) {
    res.clearCookie("accesstoken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    if (
      error instanceof jwt.JsonWebTokenError ||
      (error as Error).message == "Refresh token not present"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
        error: (error as Error).message,
      });
    }

    console.error(`Some error Occurred`, (error as Error).message);

    return res.status((error as CustomError).code || 500).json({
      success: false,
      message: "Some Internal server error occurred during refreshToken",
      error: (error as Error).message,
    });
  }
};

export const LogOut = async (req: Request, res: Response) => {
  try {
    const { refreshtoken } = req.cookies;

    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if (!REFRESH_TOKEN_SECRET) {
      throw new Error("Refresh token secret is not defined in env variables");
    }
    const decode = jwt.verify(refreshtoken, REFRESH_TOKEN_SECRET);
    const user = await User.findById((decode as TokenInterface).userId);

    if (!user) {
      throw new CustomError("User not found", 401);
    }
    res.clearCookie("accesstoken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    await redis.del(`refresh_token:user:${user._id}`).catch(console.error);

    res.json({
      message: "Logged Out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error occurred while Log out", (error as Error).message);
    return res.status(500).json({
      message: "Some internal server error occurred",
      error: (error as Error).message,
    });
  }
};
