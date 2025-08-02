import { Router } from "express";

const contentRouter = Router();

contentRouter.get("/", (req, res) => {
  res.json({
    message: "Content Router",
  });
});

export default contentRouter;
