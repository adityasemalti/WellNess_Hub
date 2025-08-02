import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";

// Load env vars
dotenv.config();

// Connect MongoDB
connectDB();

// Init express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRouter);
app.use("/api/session", sessionRouter);

// Root
app.get("/", (req, res) => {
  res.send("🌿 Arvyax Wellness Backend is running...");
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
