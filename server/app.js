import express from "express";
import cors from "cors";
import fs from "fs";
import http from "http";
import { initSockets } from "./sockets.js";

const app = express();

const httpServer = http.createServer(app);

initSockets(httpServer);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

// creating public/temp directory
const dir = "./uploads";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log(`Directory ${dir} created successfully.`);
}

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//routes import
import authRoutes from "./routes/auth.js";
import mockupRoutes from "./routes/mockups.js";

//routes declaration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/mockups", mockupRoutes);

// Invalid API call
import { ApiError } from "./utils/ApiError.js";

app.use("*", (_, res) => {
  res.status(404).json(new ApiError(404, "INVALID ROUTE!! NO API FOUND"));
});

export { httpServer };
