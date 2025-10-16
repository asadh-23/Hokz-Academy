import { generateRefreshToken, generateAccessToken } from "../config/jwt.js";
import User from "../models/userModal.js";
import { sendOtpEmail, sendPasswordResetEmail } from "../utils/emailService.js";
import hashPassword from "../utils/hashPassword.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import crypto from "crypto"

export const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNo, password, confirmPassword } = req.body;

        if (!name || !email || !phoneNo || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!/^(\+91)?\d{10}$/.test(phoneNo)) {
            return res.status(400).json({ message: "Invalid Indian phone number" });
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "Password too short" });
        }

        // Check duplicates in DB
        const userExists = await User.findOne({ email });
        if (userExists && userExists.is_verified) return res.status(400).json({ message: "User already registered" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        if (userExists && !userExists.is_verified) {
            userExists.otp = otp;
            userExists.otpExpiry = otpExpiry;
            await userExists.save();
        } else {

            const newUser = new User({
                full_name: name,
                phoneNo,
                email,
                password,
                user_id: uuidv4(),
                otp,
                otpExpiry,
            });
            await newUser.save();
        }

        try {
            await sendOtpEmail(email, otp);
        } catch (error) {
            console.error("❌ OTP email failed:", error);
            return res.status(500).json({ message: "Failed to send OTP email" });
        }

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email. Please verify to complete registration.",
            email,
        });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });
        if (user.is_verified) return res.status(400).json({ message: "User already verified" });
        if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });
        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        user.is_verified = true;
        user.otp = null;
        user.otpExpiry = null;

        const refreshToken = generateRefreshToken(user._id);
        const accessToken = generateAccessToken(user._id);

        user.refreshToken = refreshToken;
        const savedUser = await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            accessToken,
            user: {
                name: savedUser.full_name,
                email: savedUser.email,
                user_id: savedUser.user_id,
                profileImage: savedUser.profileImage,
            },
        });
    } catch (error) {
        console.error("❌ OTP verification error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Cannot resend OTP" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendOtpEmail(email, otp);

        res.status(200).json({
            success: true,
            message: "A new OTP has been sent to your email.",
        });

    } catch (error) {
        console.error("❌ Resend OTP error:", error);
        res.status(500).json({ message: "Server error during OTP resend." });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.is_verified) {
            return res.status(400).json({ message: "Please verify your email first" });
        }

        if(user.is_block){
            return res.status(403).json({message : "Your account has been blocked by the administrator. Please contact support."})
        }

        const isPasswordValid = await user.matchPassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message : "Invalid email or password"});
        }
        

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        const savedUser = await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: {
                name: savedUser.full_name,
                email: savedUser.email,
                user_id: savedUser.user_id,
                profileImage: savedUser.profileImage,
            },
        });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const googleAuth = async (req, res) => {
    try{

        const { email, name, googleId, profilePic } = req.body;
        if (!email || !googleId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Google data",
            });
        }
    
        
            let user = (await User.findOne({ googleId })) || (await User.findOne({ email }));

            if(user.is_block){
                return res.status(403).json({message : "Your account has been blocked by the administrator. Please contact support."})
            }
    
            if (!user) {
                user = await User.create({
                    full_name: name,
                    email,
                    googleId,
                    profileImage: profilePic,
                    is_verified: true,
                    user_id: uuidv4(),
                });
            } else {
                if (!user.googleId) {
                    user.googleId = googleId;
                    user.profileImage = profilePic;
                    user.is_verified = true;
                }
            }
    
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);
    
            user.refreshToken = refreshToken;
            await user.save();
    
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
    
            return res.status(200).json({
                success: true,
                message: "Google login successful",
                accessToken,
                user: {
                    name: user.full_name,
                    email: user.email,
                    user_id: user.user_id,
                    profileImage: user.profileImage,
                },
            });
    }catch (error) {
        console.log("Google auth error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const forgotPassword = async (req,res) => {
    try{

        const {email} = req.body;
        if(!email){
            return res.status(400).json({message : "Please provide an email address"});
        }
    
        
            const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User not found"});
        }
    
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
        user.passwordResetToken = hashedToken;
        user.passwordResetExpiry = Date.now() + 10 * 60 * 1000 // 10 minutes
        await user.save();
    
        await sendPasswordResetEmail(user.email, resetToken, "user");
    
        return res.status(200).json({
            success : true,
            message : "Check your email for reset link"
        });
    }catch(error){
        console.log("forgot password error", error);
        
        return res.status(500).json({message : "Error sending the email"});
    }
    
}

export const resetPassword = async (req,res) => {
    try{
        const {password} = req.body;
        const resetToken = req.params.token;

        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        const user = await User.findOne({
            passwordResetToken : hashedToken,
            passwordResetExpiry : { $gt: Date.now() }
        });

        if(!user){
            return res.status(400).json({message : "Token is invalid or Expired"});
        }
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpiry = undefined;
        await user.save();

        return res.status(200).json({
            success : true,
            message : "Password reset successful",
        })

    }catch(error){
        console.log("Reset password error ", error);
        return res.status(500).json({message : "Internal server error"});
    }
}