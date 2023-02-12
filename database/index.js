import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    const database = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${database.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to mongoDB", error);
  }
};

export default connectDB;
