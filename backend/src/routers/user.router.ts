import { Router } from "express";
import {
  accessRefreshToken,
  accountDetailUpdate,
  assignRole,
  avatarUpdate,
  changePassword,
  forgotPasswordRequest,
  getCurrentUser,
  resetPassword,
  sendVerifyEmailRequest,
  userRegister,
  userSignIn,
  userSignOut,
} from "../controllers/user.controller";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { userRoleEnum } from "../constants";

const router = Router();

// unsecure router
router.route("/signup").post(userRegister);
router.route("/signin").post(userSignIn);
router.route("/refresh_token").post(accessRefreshToken);
router.route("/forgot_password").post(forgotPasswordRequest);
router.route("/reset_password/:resetToken").post(resetPassword);

// secure router
router.route("/signout").post(verifyJWT, userSignOut);
router.route("/current_user").get(verifyJWT, getCurrentUser);
router.route("/account_update").patch(verifyJWT, accountDetailUpdate);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), avatarUpdate);
router
  .route("/assign_role/:userId")
  .patch(verifyJWT, verifyPermission([userRoleEnum.ADMIN]), assignRole);
router
  .route("/send_email_verification")
  .post(verifyJWT, sendVerifyEmailRequest);
router.route("/change_password").patch(verifyJWT, changePassword);

export default router;
