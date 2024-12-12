import { drizzle } from "drizzle-orm/mysql2";
import { DB_NAME } from "../constants";

const connectDB = () => {
  try {
    const connectionInstance = drizzle(
      `${process.env.DATABASE_URL}/${DB_NAME}`
    );
    console.log(`\n MySQL connected !! DB Host: ${connectionInstance}`);
  } catch (error) {
    console.log("MySQL connection failed!!!:", error);
    process.exit(1);
  }
};

export default connectDB;
