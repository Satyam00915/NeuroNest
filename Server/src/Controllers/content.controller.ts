import { Request, Response } from "express";
import {
  articleSchema,
  audioSchema,
  imageSchema,
  videoSchema,
} from "../zod/content.zod";
import Content from "../Models/content.model";
import { AuthenticatedRequest } from "../Middleware/auth.middleware";
import { tagUpdater } from "../Lib/taghelper";
import { dataUri } from "../Lib/multer";
import cloudinary from "../Lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import Tag from "../Models/tags.model";

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
    const { title, type, tags, externalUrl, thumbnailImg } = req.body;
    const { success, error } = articleSchema.safeParse({
      title,
      type,
      tags,
      externalUrl,
      thumbnailImg,
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
      file: {
        externalUrl,
      },
      title,
      type,
      tags: newTags,
      thumbnailImg,
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
    const { title, type, tags, externalUrl, thumbnailImg } = req.body;
    const { success } = videoSchema.safeParse({
      title,
      type,
      tags,
      externalUrl,
      thumbnailImg,
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
      file: {
        externalUrl,
      },
      title,
      type,
      tags: newTags,
      thumbnailImg,
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

export const AddImage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { type, tags, title, externalUrl } = req.body;
    const { success, error } = imageSchema.safeParse({
      type,
      title,
      tags,
      externalUrl,
    });

    if (!success) {
      throw new CustomError("Schema validation Failed" + error, 400);
    }
    const user = req.user;

    if (!user) {
      throw new CustomError("Unauthorized", 401);
    }

    let fileData: {
      public_id?: string;
      cloudinary_url?: string;
      externalUrl?: string;
    } = {};

    if (req.file && externalUrl) {
      throw new CustomError("Send either a file or a link, not both", 400);
    }

    if (req.file) {
      const file = req.file;
      const fileuri = dataUri(req);
      if (!fileuri.content) {
        throw new CustomError("File Conversion Failed", 400);
      }
      const result = await cloudinary.uploader.upload(fileuri.content, {
        folder: "neuronest/images",
      });

      fileData = {
        public_id: result.public_id,
        cloudinary_url: result.secure_url,
      };
    } else if (externalUrl) {
      fileData = {
        externalUrl,
      };
    } else {
      throw new CustomError("Either file or link must be provided", 400);
    }

    const newTags = await tagUpdater(tags);

    const content = await Content.create({
      file: fileData,
      title,
      thumbnailImg: externalUrl,
      type,
      tags: newTags,
      userId: user._id,
    });

    res.status(201).json({
      message: "Content created Successfuly",
      success: true,
      content,
    });
  } catch (error) {
    console.error(error);
    return res.status((error as CustomError).code || 500).json({
      message: (error as CustomError).message || "Server error occurred",
      success: false,
    });
  }
};

export const AddAudio = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, type, tags } = req.body;
    const audiofile = req.file;

    const { success, error } = audioSchema.safeParse({
      title,
      tags,
      type,
    });

    if (!success) {
      throw new CustomError("Schema Validation Failed", 400);
    }

    console.log(audiofile);

    if (!audiofile) {
      throw new CustomError("No Audio File present", 400);
    }

    const user = req.user;

    if (!user) {
      throw new CustomError("Unauthorized User", 401);
    }

    const streamupload = (
      buffer: Buffer,
      folder: string,
      publicid: string
    ): Promise<UploadApiResponse> => {
      return new Promise((res, rej) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              folder: folder,
              public_id: publicid,
            },
            (err, result) => (err ? rej(err) : res(result as UploadApiResponse))
          )
          .end(buffer);
      });
    };

    const result: UploadApiResponse = await streamupload(
      audiofile.buffer,
      "neuronest/audio",
      `AudioFile_${user._id}-${Date.now()}`
    );

    const newTags = await tagUpdater(tags);

    const content = await Content.create({
      title,
      tags: newTags,
      type,
      file: {
        public_id: result.public_id,
        cloudinary_url: result.secure_url,
      },
      userId: user._id,
    });

    res.json({
      content,
      message: "Audio File Added Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status((error as CustomError).code || 500).json({
      error,
      message: (error as CustomError).message || "Server error",
    });
  }
};

export const FetchTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find({});
    res.json({
      message: "Tags Fetched",
      tags,
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
