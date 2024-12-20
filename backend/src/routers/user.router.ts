import { Router } from "express";
import {
  accessRefreshToken,
  accountDetailUpdate,
  assignRole,
  avatarUpdate,
  getCurrentUser,
  userRegister,
  userSignIn,
  userSignOut,
} from "../controllers/user.controller";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { availableUserRole } from "../constants";

const router = Router();

// unsecure router
router.route("/signup").post(userRegister);
router.route("/signin").post(userSignIn);
router.route("/refresh_token").post(accessRefreshToken);

// secure router
router.route("/signout").post(verifyJWT, userSignOut);
router.route("/current_user").get(verifyJWT, getCurrentUser);
router.route("/account_update").patch(verifyJWT, accountDetailUpdate);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), avatarUpdate);
router
  .route("/assign_role/:userId")
  .patch(verifyJWT, verifyPermission(availableUserRole), assignRole);

export default router;
