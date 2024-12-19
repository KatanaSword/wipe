import { Router } from "express";
import {
  getCurrentUser,
  userRegister,
  userSignIn,
  userSignOut,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

// unsecure router
router.route("/signup").post(userRegister);
router.route("/signin").post(userSignIn);

// secure router
router.route("/signout").post(verifyJWT, userSignOut);
router.route("/current_user").get(verifyJWT, getCurrentUser);
export default router;
