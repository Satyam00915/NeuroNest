import mongoose from "mongoose";
import Tag from "../Models/tags.model";

export async function tagUpdater(tags: string[]) {
  const newTags = await Promise.all(
    tags.map(async (tagName: string) => {
      if (mongoose.Types.ObjectId.isValid(tagName)) {
        return tagName;
      }

      const existing = await Tag.findOneAndUpdate(
        { title: tagName }, //Find by title
        { $setOnInsert: { title: tagName } }, //Only insert if it doesn't exist
        { upsert: true, new: true } //Create if not found, return the updated doc
      );
      return existing._id;
    })
  );

  return newTags;
}
