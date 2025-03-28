import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRouter from "./routers/user.router";
import backgroundColorRouter from "./routers/backgroundColor.router";
import aspectRatioRouter from "./routers/aspectRatio.router";
import blogRouter from "./routers/blog.router";
import codeRouter from "./routers/code.router";
import screenshotRouter from "./routers/screenshot.router";
import testimonialRouter from "./routers/testimonial.router";

// declare routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/background_colors", backgroundColorRouter);
app.use("/api/v1/aspect_ratios", aspectRatioRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/codes", codeRouter);
app.use("./api/v1/screenshots", screenshotRouter);
app.use("/api/v1/testimonials", testimonialRouter);

export default app;
