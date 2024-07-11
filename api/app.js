import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middlewares.js";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

const httpServer = http.createServer(app);

// global middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credential: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.use(morgan("dev"));

// importing user routes
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import { profileUpload } from "./utils/multerSetup.js";

// app API's
app.get("/api/v1/test", (req, res) => {
  return res.send("hello world!");
});

// user routes
app.use("/api/v1/users", userRouter);

// admin routes
app.use("/api/v1/admin", adminRouter);

// custom error handler middleware
app.use(errorHandler);

export { httpServer };
