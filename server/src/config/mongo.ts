import mongoose from "mongoose";

// connect to mongodb
export function mongoConnection() {
  console.log("MONGO URI!!!", process.env.MONGODB_URI);
  mongoose.connect(
    process.env.MONGODB_URI,
    () => console.log("connected to mongodb")
  );
}