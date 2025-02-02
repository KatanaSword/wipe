import { Router } from "express";
import {
  createCode,
  deleteCode,
  getAllCodes,
  getCodeById,
  updateCode,
  updateCodeAspectRatio,
  updateCodeBackgroundColor,
  updateFileName,
} from "../controllers/code.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(getAllCodes).post(verifyJWT, createCode);
router
  .route("/:codeId")
  .get(getCodeById)
  .patch(verifyJWT, updateCode)
  .delete(verifyJWT, deleteCode);
router.route("/file_name/:codeId").patch(verifyJWT, updateFileName);
router.route("/aspect_ratio/:codeId").patch(verifyJWT, updateCodeAspectRatio);
router
  .route("/background_color/:codeId")
  .patch(verifyJWT, updateCodeBackgroundColor);

export default router;
