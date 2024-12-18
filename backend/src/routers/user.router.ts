import { Router } from "express";
import {
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
export default router;
