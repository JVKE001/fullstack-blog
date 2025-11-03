// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import path from "path";
import { fileURLToPath } from "url";

// Database configuration
import connectDB from "./database/mogodb_config.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`.yellow.bold);
});
