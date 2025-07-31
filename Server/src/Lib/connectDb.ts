import mongoose from "mongoose";

export async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
}
