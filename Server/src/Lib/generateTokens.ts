import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default function generateTokens(userId: Types.ObjectId) {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET || "Lucifer915",
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET || "Satyam215",
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}
