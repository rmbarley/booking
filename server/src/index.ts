import path from "path";
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
