import { Router } from "express";
import {
  accessRefreshToken,
  accountDetailUpdate,
  avatarUpdate,
  getCurrentUser,
  userRegister,
  userSignIn,
  userSignOut,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

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

export default router;
