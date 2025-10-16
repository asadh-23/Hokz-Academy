import express from "express";
import {registerUser, verifyOtp, loginUser, resendOtp, googleAuth, forgotPassword, resetPassword} from "../controllers/userController.js";

const user_router = express.Router();

user_router.post("/register", registerUser);
user_router.post("/verify-otp", verifyOtp);
user_router.post("/login", loginUser);
user_router.post("/resend-otp", resendOtp);
user_router.post("/google-auth",googleAuth);
user_router.post("/forgot-password",forgotPassword);
user_router.post("/reset-password/:token",resetPassword);



export default user_router;