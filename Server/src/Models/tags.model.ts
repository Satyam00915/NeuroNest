import mongoose, { Document, Types } from "mongoose";

interface TagDocument extends Document {
  _id: Types.ObjectId;
  title: string;
}

const tagsSchema = new mongoose.Schema<TagDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Tag = mongoose.model("Tag", tagsSchema);

export default Tag;
