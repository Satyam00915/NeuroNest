import { Request, Response, Router } from "express";
import authCheck from "../Middleware/auth.middleware";
import {
  AddArticle,
  AddAudio,
  AddImage,
  AddVideo,
} from "../Controllers/content.controller";
import { uploadAudio, uploadImage } from "../Lib/multer";

const contentRouter = Router();

contentRouter.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Route working",
  });
});

contentRouter.post("/article", authCheck, AddArticle);
contentRouter.post("/video", authCheck, AddVideo);
contentRouter.post("/image", authCheck, uploadImage.single("file"), AddImage);
contentRouter.post(
  "/audio",
  authCheck,
  uploadAudio.single("audiofile"),
  AddAudio
);

export default contentRouter;
