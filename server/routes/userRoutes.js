import express from "express";
import {registerUser, verifyOtp, loginUser, resendOtp, googleAuth, forgotPassword, resetPassword} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/login", loginUser);
userRouter.post("/resend-otp", resendOtp);
userRouter.post("/google-auth",googleAuth);
userRouter.post("/forgot-password",forgotPassword);
userRouter.post("/reset-password/:token",resetPassword);



export default userRouter;