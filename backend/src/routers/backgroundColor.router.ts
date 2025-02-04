import { Router } from "express";
import {
  createBackgroundColor,
  deleteBackgroundColor,
  getAllBackgroundColors,
  getBackgroundColorById,
  updateBackgroundColor,
} from "../controllers/backgroundColor.controller";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { userRoleEnum } from "../constants";

const router = Router();

router
  .route("/")
  .get(getAllBackgroundColors)
  .post(
    verifyJWT,
    verifyPermission([userRoleEnum.ADMIN]),
    createBackgroundColor
  );
router
  .route("/:backgroundColorId")
  .get(getBackgroundColorById)
  .delete(
    verifyJWT,
    verifyPermission([userRoleEnum.ADMIN]),
    deleteBackgroundColor
  )
  .patch(
    verifyJWT,
    verifyPermission([userRoleEnum.ADMIN]),
    updateBackgroundColor
  );

export default router;
