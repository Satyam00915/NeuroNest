import { redis } from "./redis";
import type { Types } from "mongoose";

export async function storeTokens(
  userId: Types.ObjectId,
  refreshToken: string
) {
  await redis.set(`refresh_token:user:${userId.toString()}`, refreshToken, {
    ex: 7 * 24 * 60 * 60,
  });
}
