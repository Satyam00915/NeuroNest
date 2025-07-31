import { Router } from "express";
import { SignIn, SignUp } from "../Controllers/user.controller";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({
    message: "User Router",
  });
});

userRouter.post("/signup", SignUp);
userRouter.post("/signin", SignIn);

export default userRouter;
