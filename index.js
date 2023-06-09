import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { getLayout } from "./repositories/newsRepositories.js";
import mongoose from "mongoose";
import fs from "fs";
import cors from "cors";
import checkToken from "./authentication/auth.js";

import connectDB from "./mongodb/connect.js";
import postRouter from "./routes/posts.js";
import { studentRouter, userRouter } from "./routes/index.js";

const app = express();
const PORT = process.env?.PORT ?? 5000;
// app.use() middware

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "connect success",
  });
});
app.get("/thanh", async (req, res) => {
  return res.status(200).json({
    message: "connect success",
  });
});

app.get("/getdata", async (req, res) => {
  let respone = await getLayout(req.body);
  console.log("respone data", respone);
  res.status(200).json({
    message: "get list json success",
    data: respone,
  });
});
// app.use(checkToken); // guard
// app.use("/user", postRouter);
// app.use("/user", userRouter);
// app.use("/students", studentRouter);
app.listen(PORT, () => {
  console.log("server has started on port http://localhost:8080");
});
// const startServer = async () => {
//   try {
//     await connectDB(process.env.MONGODB_URL);
//     app.listen(PORT, () => {
//       console.log("server has started on port http://localhost:8080");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// startServer();
