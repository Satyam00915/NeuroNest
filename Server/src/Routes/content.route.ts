import { Router } from "express";
import authCheck from "../Middleware/auth.middleware";
import { AddArticle } from "../Controllers/content.controller";

const contentRouter = Router();

contentRouter.get("/", (req, res) => {
  res.json({
    message: "Content Router",
  });
});

contentRouter.post("/", authCheck, AddArticle);

export default contentRouter;
