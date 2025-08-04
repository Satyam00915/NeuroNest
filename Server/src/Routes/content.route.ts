import { Request, Response, Router } from "express";
import authCheck from "../Middleware/auth.middleware";
import {
  AddArticle,
  AddImage,
  AddVideo,
} from "../Controllers/content.controller";
import { multerUploads } from "../Lib/multer";

const contentRouter = Router();

contentRouter.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Route working",
  });
});

contentRouter.post("/article", authCheck, AddArticle);
contentRouter.post("/video", authCheck, AddVideo);
contentRouter.post("/image", authCheck, multerUploads, AddImage);

export default contentRouter;
