import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./Router/user.route.js";
import userTask from "./Router/task.route.js";

const app = express();

// ✅ CORS must come before any routes/middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://taskinforge.netlify.app"],
  credentials: true,
}));

// ✅ Optional: Handle preflight for all routes
app.options("*", cors());

// ✅ Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/v1", userRouter);
app.use("/api/v1/task", userTask);

export default app;
