import mongoose, { mongo } from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image:{
      type:String
    },
    tags: {
      type: [String],
      default: []
    },
    content: {
      type: Object, // or Schema.Types.Mixed
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
  },
  {
    timestamps: true
  }
);


const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema)
export default Session