import { generateRefreshToken, generateAccessToken } from "../config/jwt.js";
import User from "../models/userModel.js";
import { sendOtpEmail, sendPasswordResetEmail } from "../utils/emailService.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto"
import OTP from "../models/OtpModel.js";
import { setAuthTokens } from "../helpers/tokenHelpers.js";

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
            return res.status(400).json({ message: "Invalid phone number" });
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "Password too short" });
        }

        // Check duplicates in DB
        const user = await User.findOne({ email });
        if (user && user.isVerified) return res.status(400).json({ message: "User already registered" });

        await OTP.deleteMany({ email, role: "User" });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await OTP.create({
            email,
            otpCode,
            role: "User",
        });

        
        if(!user){
            await User.create({
                fullName : name,
                phoneNo,
                email,
                password,
                userId : uuidv4(),
            });
        }

        await sendOtpEmail(email, otpCode);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email. Please verify to complete registration.",
        });

    } catch (error) {
        console.error("❌User Registration error:", error);
        res.status(500).json({ message: "Registration failed" });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otpCode} = req.body;
        
        const otpDoc = await OTP.findOne({email, otpCode, role: "User"});
        if(!otpDoc) return res.status(400).json({message: "Invalid or expired OTP"});
            
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const accessToken = setAuthTokens(res, user);

        user.isVerified = true;
        const savedUser = await user.save();

        await OTP.deleteOne({_id: otpDoc._id});

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            accessToken,
            user: {
                name: savedUser.fullName,
                email: savedUser.email,
                userId: savedUser.userId,
                profileImage: savedUser.profileImage,
            },
        });

    } catch (error) {
        console.error("❌ OTP verification error:", error);
        res.status(500).json({ message: "OTP verification error" });
    }
};

export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Cannot resend OTP to this email" });

        await OTP.deleteMany({email, role:"User"});

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        await OTP.create({
            email,
            otpCode,
            role: "User",
            createdAt: new Date(),
        });

        await sendOtpEmail(email, otpCode);

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

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email first" });
        }

        if(user.isBlocked){
            return res.status(403).json({message : "Your account has been blocked by the administrator. Please contact support."})
        }

        const isPasswordValid = await user.matchUserPassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message : "Invalid email or password"});
        }
        

        const accessToken = setAuthTokens(res, user);
        user.lastLogin = new Date();
        const savedUser = await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: {
                name: savedUser.fullName,
                email: savedUser.email,
                userId: savedUser.userId,
                profileImage: savedUser.profileImage,
            },
        });
    } catch (error) {
        console.error("❌ User login error:", error);
        res.status(500).json({ message: "Login failed" });
    }
};

export const googleAuth = async (req, res) => {
    try{

        const {name, email, googleId, profileImage } = req.body;
        if (!email || !googleId) {
            return res.status(400).json({
                message: "Invalid Google data",
            });
        }
    
        
            let user = (await User.findOne({ googleId })) || (await User.findOne({ email }));

            if(user && user.isBlocked){
                return res.status(403).json({message : "Your account has been blocked by the administrator. Please contact support."})
            }
    
            if (!user) {
                user = await User.create({
                    fullName: name,
                    email,
                    googleId,
                    profileImage,
                    isVerified: true,
                    userId: uuidv4(),
                });
            } else {
                if (!user.googleId) {
                    user.googleId = googleId;
                    user.profileImage = profileImage;
                    user.isVerified = true;
                }
            }
    

            const accessToken = setAuthTokens(res, user);

            const savedUser = await user.save();
    
            return res.status(200).json({
                success: true,
                message: "Google login successful",
                accessToken,
                user: {
                    name: savedUser.fullName,
                    email: savedUser.email,
                    userId: savedUser.userId,
                    profileImage: savedUser.profileImage,
                },
            });

    }catch (error) {
        console.log("Google auth error : ", error);
        return res.status(500).json({message: "Google login failed",});
    }
};

export const forgotPassword = async (req,res) => {
    try{

        const {email} = req.body;
        if(!email){
            return res.status(400).json({message : "Please provide a valid email address"});
        }
    
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User with this email not found"});
        }

        if(user.isBlocked){
            return res.status(403).json({message : "Your account has been blocked by the administrator. Please contact support."})
        }
    
        const passwordResetToken = crypto.randomBytes(32).toString("hex");
        const hashedPasswordResetToken = crypto.createHash("sha256").update(passwordResetToken).digest("hex");
    
        user.passwordResetToken = hashedPasswordResetToken;
        user.passwordResetExpiry = Date.now() + 10 * 60 * 1000 // 10 minutes
        await user.save();
    
        await sendPasswordResetEmail(user.email, passwordResetToken, "user");
    
        return res.status(200).json({
            success : true,
            message : "Check your email for the password reset link"
        });

    }catch(error){
        console.log("forgot password error", error);
        return res.status(500).json({message : "Something went wrong while sending the reset email. Please try again later."});
    } 
}


export const resetPassword = async (req,res) => {
    try{
        const {password} = req.body;
        const passwordResetToken = req.params.token;

        const hashedPasswordResetToken = crypto.createHash("sha256").update(passwordResetToken).digest("hex");

        const user = await User.findOne({
            passwordResetToken : hashedPasswordResetToken,
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
        });

    }catch(error){
        console.log("Reset password error ", error);
        return res.status(500).json({message : "Failed to send password rest email"});
    }
}