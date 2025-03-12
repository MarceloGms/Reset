import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import requestRouter from "./routes/request.js";

import benchesRouter from "./routes/benches.js";

const app = express();

app.use(cors({ origin: process.env.WEB_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/request", requestRouter);
app.use("/api/benches", benchesRouter);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
