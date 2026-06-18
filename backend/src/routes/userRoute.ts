import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post("/register",userController.registerController);
router.post("/login",userController.loginController);
router.post("/refresh",userController.refreshAccessTokenController);

export default router;