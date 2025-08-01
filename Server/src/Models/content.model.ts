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
        ref: "Tag",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);
