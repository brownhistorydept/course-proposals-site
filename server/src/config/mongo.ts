import mongoose from "mongoose";

// connect to mongodb
export function mongoConnection() {
    mongoose.connect(
        process.env.MONGODB_STRING || "",
        () => {console.log("connected to mongodb");}
    );
}