import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonialAspectRatio,
  updateTestimonialAvatar,
  updateTestimonialBackgroundColor,
  updateFileName,
  updateTestimonial,
} from "../controllers/testimonial.controller";

const router = Router();

router.route("/").get(getAllTestimonials).post(verifyJWT, createTestimonial);
router
  .route("/:testimonialId")
  .get(getTestimonialById)
  .patch(verifyJWT, updateTestimonial)
  .delete(verifyJWT, deleteTestimonial);
router.route("/file_name/:testimonialId").patch(verifyJWT, updateFileName);
router
  .route("/aspect_ratio/:testimonialId")
  .patch(verifyJWT, updateTestimonialAspectRatio);
router
  .route("/background_color/:testimonialId")
  .patch(verifyJWT, updateTestimonialBackgroundColor);
router
  .route("/update_avatar/:testimonialId")
  .patch(verifyJWT, upload.single("avatar"), updateTestimonialAvatar);

export default router;
