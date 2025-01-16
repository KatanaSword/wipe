import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { userRoleEnum } from "../constants";
import {
  createAspectRatio,
  deleteAspectRatio,
  getAllAspectRatio,
  getAspectRatioById,
  updateAspectRatio,
} from "../controllers/aspectRatio.controller";

const router = Router();

router
  .route("/")
  .get(getAllAspectRatio)
  .post(verifyJWT, verifyPermission([userRoleEnum.ADMIN]), createAspectRatio);

router
  .route("/:aspectRatioId")
  .get(getAspectRatioById)
  .patch(verifyJWT, verifyPermission([userRoleEnum.ADMIN]), updateAspectRatio)
  .delete(verifyJWT, verifyPermission([userRoleEnum.ADMIN]), deleteAspectRatio);

export default router;
