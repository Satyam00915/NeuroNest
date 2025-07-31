import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../Models/user.model";
import generateTokens from "../Lib/generateTokens";
import { storeTokens } from "../Lib/storeTokens";
import { setCookies } from "../Lib/setCookies";

interface UserDocument extends Document {
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
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
      message: "SignIn successfull",
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
