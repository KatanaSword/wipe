import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  updateBlogAspectRatio,
  updateBlogBackgroundColor,
  updateFileName,
  updateBlogImage,
} from "../controllers/blog.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(getAllBlogs).post(verifyJWT, createBlog);
router
  .route("/:blogId")
  .get(getBlogById)
  .patch(verifyJWT, updateBlog)
  .delete(verifyJWT, deleteBlog);
router.route("/file_name/:blogId").patch(verifyJWT, updateFileName);
router.route("/image/:blogId").patch(verifyJWT, updateBlogImage);
router.route("/aspect_ratio/:blogId").patch(verifyJWT, updateBlogAspectRatio);
router
  .route("/background_color/:blogId")
  .patch(verifyJWT, updateBlogBackgroundColor);

export default router;
