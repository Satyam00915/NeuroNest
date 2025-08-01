import { Router } from "express";
import {
  LogOut,
  RefreshToken,
  SignIn,
  SignUp,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({
    message: "User Router",
  });
});

userRouter.post("/signup", SignUp);
userRouter.post("/signin", SignIn);
userRouter.get("/refresh", RefreshToken);
userRouter.get("/logout", LogOut);

export default userRouter;
