import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("mongodb already connected");
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    console.log("connecting mongodb");
    return mongoose.connect(uri);
  }
}
