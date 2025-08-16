import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/user.model";
import generateTokens from "../Lib/generateTokens";
import { storeTokens } from "../Lib/storeTokens";
import { setCookies } from "../Lib/setCookies";
import { TokenInterface } from "../Lib/token";
import { redis } from "../Lib/redis";
import Otp from "../Models/otp.model";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { emailTemp, verifyLink } from "../Lib/emailTemp";
import transporter from "../Lib/nodemailer";
import { AuthenticatedRequest } from "../Middleware/auth.middleware";

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

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashToken = await bcrypt.hash(rawToken, 10);

    const user = await User.create({
      fullName,
      email,
      username,
      password,
      verifyToken: hashToken,
      tokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    //Send Verification Email

    const html = verifyLink(
      fullName,
      `${process.env.BACKEND_URL}/api/user/verify?token=${rawToken}&email=${email}`
    );
    let info;

    try {
      info = await transporter.sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: "Verification Link From NeuroNST",
        html: html,
      });
    } catch (error) {
      throw new CustomError("Verification Email Sending Failed", 400);
    }

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
      message: "Signup Successfull , Check your email for verification",
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
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      sameSite: "none",
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
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      sameSite: "none",
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

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) {
      throw new CustomError("Invalid Email Id", 404);
    }

    await Otp.deleteMany({
      userId: userFound._id,
      purpose: "password-reset",
    });

    const RandomOtp = crypto.randomInt(1000, 10000);
    const salt = await bcrypt.genSalt(4);
    const hashedOtp = await bcrypt.hash(RandomOtp.toString(), salt);

    const otp = await Otp.create({
      otpHash: hashedOtp,
      userId: userFound._id,
      purpose: "password-reset",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const html = emailTemp(userFound.fullName, RandomOtp, email);
    let info;
    try {
      info = await transporter.sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: "OTP for Email Confirmation From NeuroNST",
        html: html,
      });
    } catch (error) {
      await Otp.findByIdAndDelete(otp._id);
      throw error;
    }

    return res.json({
      message: "Email sent Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message || "Internal Server error",
      success: false,
    });
  }
};

export const VerifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    const OtpCode = await Otp.findOne({
      userId: user?._id,
      purpose: "password-reset",
    });

    if (!OtpCode) {
      throw new CustomError("Otp has expired", 400);
    }

    const verify = await bcrypt.compare(otp.toString(), OtpCode.otpHash);
    if (!verify) {
      throw new CustomError("Otp is Incorrect", 400);
    }

    await Otp.findByIdAndDelete(OtpCode._id);

    const ResetTokenSecret = process.env.JWT_RESET_TOKEN;

    if (!ResetTokenSecret) {
      throw new CustomError("Some error occurred", 400);
    }

    const resetToken = jwt.sign(
      {
        userId: user?._id,
        purpose: "password-reset",
      },
      ResetTokenSecret
    );

    res.cookie("resetToken", resetToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.json({
      success: true,
      redirect: "/changePassword",
    });
  } catch (error) {
    console.log(error);
    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message || "Server error",
      success: false,
    });
  }
};

export const ChangePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { password } = req.body;
    const user = req.user;

    user!.password = password;
    await user?.save();

    return res.status(200).json({
      message: "Password has been changed.",
      success: true,
      redirect: "/login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const FetchUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "No user exists",
        success: false,
      });
    }
    const { _id, fullName, email, username } = req.user;

    res.json({
      user: {
        _id,
        fullName,
        email,
        username,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const verifyUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { token, email } = req.query;

    if (!token) {
      throw new CustomError("Invalid link. Please request again.", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("No User Found", 401);
    }

    if (user.isVerified) {
      return res.json({
        message: "You are already verified",
        redirect: "/login",
      });
    }

    if (user.tokenExpiry && user.tokenExpiry < new Date()) {
      throw new CustomError("Token Expired", 404);
    }

    if (!user.verifyToken) {
      throw new CustomError("No token exists", 404);
    }

    const result = await bcrypt.compare(token.toString(), user.verifyToken);
    if (!result) {
      throw new CustomError("Token Invalid", 400);
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.tokenExpiry = undefined;

    await user.save();

    res.status(200).json({
      message: "Token is valid",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message || "Server error",
      success: false,
    });
  }
};
