import zod from "zod";

export const articleSchema = zod.object({
  title: zod.string().min(6),
  type: zod.string(),
  tags: zod.array(zod.string()),
  externalUrl: zod.url(),
  thumbnailImg: zod.string().optional(),
});

export const videoSchema = zod.object({
  title: zod.string().min(6),
  type: zod.string(),
  tags: zod.array(zod.string()),
  externalUrl: zod.url(),
  thumbnailImg: zod.string().optional(),
});
