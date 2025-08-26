import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Lib/connectDb";
import userRouter from "./Routes/user.route";
import cookieParser from "cookie-parser";
import contentRouter from "./Routes/content.route";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://neuro-nest-d2fn.vercel.app",
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/content", contentRouter);

app.post("/preview", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.linkpreview.net/",
      new URLSearchParams({
        q: req.body.q,
      }),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Linkpreview-Api-Key": process.env.LINK_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    //@ts-ignore
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
  connectDb();
});
