import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../Models/user.model";
import generateTokens from "../Lib/generateTokens";
import { storeTokens } from "../Lib/storeTokens";
import { setCookies } from "../Lib/setCookies";

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
    res.json({
      message: "Signin controller",
    });
  } catch (error) {}
};
