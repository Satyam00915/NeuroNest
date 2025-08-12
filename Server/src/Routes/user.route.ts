import { Response, Router } from "express";
import {
  ChangePassword,
  FetchUser,
  ForgotPassword,
  LogOut,
  RefreshToken,
  SignIn,
  SignUp,
  VerifyOTP,
} from "../Controllers/user.controller";
import authCheck, { AuthenticatedRequest } from "../Middleware/auth.middleware";
import { checkResetToken } from "../Middleware/checkUser";

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

userRouter.post("/changePass", checkResetToken, ChangePassword);
userRouter.get("/me", authCheck, FetchUser);

export default userRouter;
