import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      dbName: "wellness_session",
    });
    console.log(`✅ Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1); // optional: exits process if DB fails
  }
};
