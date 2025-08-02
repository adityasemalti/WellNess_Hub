import express from "express";
import {
  createSession,
  updateSession,
  deleteSession,
  getAllSession,
  getMySessions,
  getSessionById
} from "../controller/sessionController.js";
import  protect  from "../middleware/auth.js";

const sessionRouter = express.Router();



// CRUD routes
sessionRouter.post("/create",protect, createSession); // Create session
sessionRouter.get("/all", getAllSession); // Get all my sessions
sessionRouter.get("/mySessions",protect,getMySessions); // Get single session
sessionRouter.put("/update/:id",protect, updateSession); // Update session
sessionRouter.delete("/:id", protect, deleteSession);
sessionRouter.get("/get/:id", getSessionById); // routes/sessionRoutes.js

export default sessionRouter;
