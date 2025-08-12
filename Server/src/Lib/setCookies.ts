import type { Response } from "express";

export async function setCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
) {
  res.cookie("accesstoken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 2 * 60 * 1000,
  });
  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
