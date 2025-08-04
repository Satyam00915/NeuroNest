import zod from "zod";

export const articleSchema = zod.object({
  title: zod.string().min(6),
  type: zod.string(),
  tags: zod.array(zod.string()),
  externalUrl: zod.url(),
  thumbnailImg: zod.string().optional(),
});

export const videoSchema = zod.object({
  title: zod.string().min(6, "Title must be atleast 6 characters"),
  type: zod.string(),
  tags: zod.array(zod.string()),
  externalUrl: zod.url(),
  thumbnailImg: zod.string().optional(),
});

export const imageSchema = zod.object({
  title: zod.string().min(6),
  type: zod.string(),
  tags: zod.array(zod.string()),
  externalUrl: zod.url().optional(),
});
