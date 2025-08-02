import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Lib/connectDb";
import userRouter from "./Routes/user.route";
import cookieParser from "cookie-parser";
import contentRouter from "./Routes/content.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/content", contentRouter);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
  connectDb();
});
