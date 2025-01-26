import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DB_NAME}`
    );
    console.log(
      `\nMySQL connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MySQL connection failed!!!:", error);
    process.exit(1);
  }
};

export default connectDB;
