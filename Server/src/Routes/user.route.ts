import { Response, Router } from "express";
import {
  ForgotPassword,
  LogOut,
  RefreshToken,
  SignIn,
  SignUp,
  VerifyOTP,
} from "../Controllers/user.controller";
import authCheck, { AuthenticatedRequest } from "../Middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/", authCheck, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: "User Router reached or not",
    user: req.user,
  });
});

userRouter.post("/signup", SignUp);
userRouter.post("/signin", SignIn);
userRouter.get("/refresh", RefreshToken);
userRouter.get("/logout", LogOut);

userRouter.post("/forgotPass", ForgotPassword);
userRouter.post("/verify", VerifyOTP);

export default userRouter;
