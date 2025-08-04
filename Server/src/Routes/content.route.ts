import { Request, Response, Router } from "express";
import authCheck from "../Middleware/auth.middleware";
import { AddArticle, AddVideo } from "../Controllers/content.controller";

const contentRouter = Router();

contentRouter.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Route working",
  });
});

contentRouter.post("/article", authCheck, AddArticle);
contentRouter.post("/video", authCheck, AddVideo);

export default contentRouter;
