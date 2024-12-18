import { Router } from "express";
import { userRegister, userSignIn } from "../controllers/user.controller";

const router = Router();

// unsecure router
router.route("/signup").post(userRegister);
router.route("/signin").post(userSignIn);

// secure router
export default router;
