import { Request, Response } from "express";
import { articleSchema, videoSchema } from "../zod/content.zod";
import Content from "../Models/content.model";
import { AuthenticatedRequest } from "../Middleware/auth.middleware";
import Tag from "../Models/tags.model";
import mongoose from "mongoose";
import { tagUpdater } from "../Lib/taghelper";

class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = "CustomError";
  }
}

export const AddArticle = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, type, tags, externalUrl } = req.body;
    const { success } = articleSchema.safeParse({
      title,
      type,
      tags,
      externalUrl,
    });

    if (!success) {
      throw new CustomError("Provide all the required Fields correctly", 400);
    }

    const user = req.user;

    if (!user) {
      throw new CustomError("Unauthorized", 401);
    }

    const newTags = await tagUpdater(tags);

    const content = await Content.create({
      title,
      type,
      tags: newTags,
      externalUrl,
      userId: user._id,
    });

    res.json({
      message: "Article created Successfully",
      content,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message || "Server error occurred",
      success: false,
    });
  }
};

export const AddVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, type, tags, externalUrl } = req.body;
    const { success } = videoSchema.safeParse({
      title,
      type,
      tags,
      externalUrl,
    });

    if (!success) {
      throw new CustomError("Schema Validation Failed", 400);
    }

    const user = req.user;

    if (!user) {
      throw new CustomError("Unauthorized", 401);
    }

    const newTags = await tagUpdater(tags);

    const content = await Content.create({
      title,
      type,
      tags: newTags,
      externalUrl,
      userId: user._id,
    });

    res.json({
      message: "Content created Successfully",
      content,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message || "Server error occurred",
      success: false,
    });
  }
};
