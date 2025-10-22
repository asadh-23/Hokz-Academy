import express from "express";
import { loginTutor, registerTutor, resendOtp, verifyOtp, googleAuth, forgotPassword, resetPassword } from "../controllers/tutorController.js";

const tutorRouter = express.Router();

tutorRouter.post("/register", registerTutor);
tutorRouter.post("/verify-otp", verifyOtp);
tutorRouter.post("/resend-otp",resendOtp);
tutorRouter.post("/login", loginTutor);
tutorRouter.post("/google-auth", googleAuth);
tutorRouter.post("/forgot-password", forgotPassword);
tutorRouter.post("/reset-password/:token",resetPassword);

export default tutorRouter;