import { Router } from "express";
import userController from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import subscriptionController from "../controllers/subscriptionController.js";

const router = Router();

router.post("/register",userController.registerController);
router.post("/login",userController.loginController);
router.post("/refresh",userController.refreshAccessTokenController);
router.post("/logout",auth,userController.logoutController);
router.post("/:userId/subscribe",auth,subscriptionController.subscribeOrUnsubscribeUser);

export default router;