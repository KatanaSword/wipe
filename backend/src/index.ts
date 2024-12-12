import connectDB from "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({
  path: "./.env",
});

try {
  connectDB();
  app.on("Error", (error) => {
    console.log("Error:", error);
  });
  app.listen(process.env.PORT, () => {
    console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
  });
} catch (error) {
  console.log("MySQL connection failed!!!:", error);
}
