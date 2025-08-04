import mongoose from "mongoose";

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    externalUrl: {
      type: String,
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
