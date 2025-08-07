import mongoose, { Types } from "mongoose";

const contentTypes = ["image", "video", "article", "audio"];

export interface ContentDoc extends Document {
  _id: Types.ObjectId;
  file: {
    public_id?: string;
    cloudinary_url?: string;
    external_url?: string;
  };
  type: string;
  title: string;
  tags: Types.ObjectId[];
  thumbnailImg?: string;
  userId: Types.ObjectId;
}

const contentSchema = new mongoose.Schema<ContentDoc>(
  {
    file: {
      public_id: {
        type: String,
        default: null,
      },
      cloudinary_url: {
        type: String,
        default: null,
      },
      externalUrl: {
        type: String,
      },
    },
    type: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    thumbnailImg: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
