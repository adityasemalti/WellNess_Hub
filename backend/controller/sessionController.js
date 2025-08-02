import cloudinary from "../configs/cloud.js";
import Session from "../models/sessionModel.js";

export const createSession = async (req, res) => {
  try {
    const { title, tags, content, status, image } = req.body;

    let imageUrl = "";

    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "wellness_sessions",
      });
      imageUrl = uploadRes.secure_url;
    }

    const session = await Session.create({
      user_id: req.user._id,
      title,
      tags,
      content,
      image: imageUrl,
      status: status || "draft",
    });

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create session",
      error: error.message,
    });
  }
};



export const getSessionById = async (req, res) => {
  try {
    const sessionId = req.params.id
    const session = await Session.findById(sessionId);
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(404).json({ success: false, message: "Session not found" });
  }
};




export const getAllSession = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch sessions", error: error.message });
  }
};

// @desc Get single session by ID
// Get all sessions created by the logged-in user
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user._id }).sort({ updatedAt: -1 });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ success: false, message: "No sessions found for this user" });
    }

    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch sessions", error: error.message });
  }
};


// @desc Update session (auto-save or publish)
export const updateSession = async (req, res) => {
  try {
    const sessionId = req.params.id

    const updatedSession = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: req.user._id },
      { ...req.body },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, message: "Session updated", session: updatedSession });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update session", error: error.message });
  }
};

// @desc Delete session
export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id
    const deleted = await Session.findOneAndDelete({ _id: sessionId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete session", error: error.message });
  }
};
