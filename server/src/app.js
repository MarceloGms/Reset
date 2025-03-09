import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";

const app = express();

app.use(cors({ origin: process.env.WEB_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
