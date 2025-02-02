import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createScreenshot,
  deleteScreenshot,
  getAllScreenshots,
  getScreenshotById,
  updateFileName,
  updateScreenshotAspectRatio,
  updateScreenshotBackgroundColor,
  updateScreenshotImage,
} from "../controllers/screenshot.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.route("/").get(getAllScreenshots).post(verifyJWT, createScreenshot);
router
  .route("/:screenshotId")
  .get(getScreenshotById)
  .patch(verifyJWT, upload.single("image"), updateScreenshotImage)
  .delete(verifyJWT, deleteScreenshot);
router.route("/file_name/:screenshotId").patch(verifyJWT, updateFileName);
router
  .route("/aspect_ratio/:screenshotId")
  .patch(verifyJWT, updateScreenshotAspectRatio);
router
  .route("/background_color/:screenshotId")
  .patch(verifyJWT, updateScreenshotBackgroundColor);

export default router;
