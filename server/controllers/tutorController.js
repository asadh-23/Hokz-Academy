import OTP from "../models/OtpModel.js";
import Tutor from "../models/tutorModel.js";
import { v4 as uuidv4 } from "uuid";
import { sendOtpEmail, sendPasswordResetEmail } from "../utils/emailService.js";
import { setAuthTokens } from "../helpers/tokenHelpers.js";
import crypto from "crypto"

export const registerTutor = async (req, res) => {
    try {
        const { name, phoneNo, email, password, confirmPassword } = req.body;
        if (!name || !phoneNo || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!/^(\+91)?\d{10}$/.test(phoneNo)) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "Password must be at least 5 characters" });
        }

        const tutor = await Tutor.findOne({ email });
        if (tutor && tutor.isVerified) {
            return res.status(400).json({ message: "Tutor already registered" });
        }

        await OTP.deleteMany({ email, role: "Tutor" });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await OTP.create({
            email,
            otpCode,
            role: "Tutor",
        });

        if (!tutor) {
            await Tutor.create({
                fullName: name,
                phoneNo,
                email,
                password,
                tutorId: uuidv4(),
            });
        }
        await sendOtpEmail(email, otpCode);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email. Please verify to complete registration.",
        });
    } catch (error) {
        console.log("Tutor registration failed");
        res.status(500).json({ message: "Tutor registration failed" });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otpCode } = req.body;

        const tutor = await Tutor.findOne({ email });
        if (!tutor) return res.status(400).json({ message: "User not found" });

        const otpDoc = await OTP.findOne({ email, otpCode, role: "Tutor" });
        if (!otpDoc) return res.status(400).json({ message: "Invalid or expired OTP" });

        const accessToken = setAuthTokens(res, tutor);

        tutor.isVerified = true;
        const savedTutor = await tutor.save();

        await OTP.deleteOne({ _id: otpDoc._id });

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            accessToken,
            tutor: {
                name: savedTutor.fullName,
                email: savedTutor.email,
                tutorId: savedTutor.tutorId,
                profileImage: savedTutor.profileImage,
            },
        });
    } catch (error) {
        console.error("OTP verification error:", error);
        return res.status(500).json({ message: "OTP verification failed" });
    }
};

export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const tutor = await Tutor.findOne({ email });
        if (!tutor) return res.status(400).json({ message: "Cannot resend otp to this email" });

        await OTP.deleteMany({ email, role: "Tutor" });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await OTP.create({
            email,
            otpCode,
            role: "Tutor",
        });

        await sendOtpEmail(email, otpCode);

        return res.status(200).json({
            success: true,
            message: "A new OTP has been sent to your email.",
        });
    } catch (error) {
        console.error("❌ Resend OTP error:", error);
        return res.status(500).json({ message: "Server error during OTP resend." });
    }
};

export const loginTutor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "All fields are required." });

        const tutor = await Tutor.findOne({ email });
        if (!tutor) return res.status(400).json({ message: "Invalid email or password." });

        if (!tutor.isVerified) return res.status(400).json({ message: "Please verify your email first." });

        if (tutor.isBlocked)
            return res
                .status(400)
                .json({ message: "Your account has been blocked by the administrator. Please contact support." });

        const isPasswordValid = await tutor.matchTutorPassword(password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password." });

        const accessToken = setAuthTokens(res, tutor);
        tutor.lastLogin = new Date();
        const savedTutor = await tutor.save();

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            tutor: {
                name: savedTutor.fullName,
                email: savedTutor.email,
                tutorId: savedTutor.tutorId,
                profileImage: savedTutor.profileImage,
            },
        });
    } catch (error) {
        console.log("Tutor Login failed");
        return res.status(500).json({ message: "Tutor login failed" });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { name, email, googleId, profileImage } = req.body;

        if (!email || !googleId) return res.status(400).json({ message: "Invalid Google data" });

        let tutor = (await Tutor.findOne({ googleId })) || (await Tutor.findOne({ email }));

        if (tutor && tutor.isBlocked) {
            return res.status(403).json({
                message: "Your account has been blocked by the administrator. Please contact support.",
            });
        }

        if (!tutor) {
            tutor = await Tutor.create({
                fullName: name,
                email,
                    profileImage,
                googleId,
                isVerified: true,
                tutorId: uuidv4(),
            });
        } else {
            if (!tutor.googleId) {
                tutor.googleId = googleId;
                tutor.profileImage = profileImage;
                tutor.isVerified = true;
            }
        }
        const accessToken = setAuthTokens(res, tutor);

        const savedTutor = await tutor.save();

        return res.status(200).json({
            success: true,
            message: "Google login successful",
            accessToken,
            tutor: {
                name: savedTutor.fullName,
                email: savedTutor.email,
                tutorId: savedTutor.tutorId,
                profileImage: savedTutor.profileImage,
            },
        });

    } catch (error) {
        console.log("Tutor google Login failed");
        return res.status(500).json({ message: "Google login failed" });
    }
};

export const forgotPassword = async (req,res) => {
    try{ 
        const {email} = req.body;
        if(!email) return res.status(400).json({message : "Please provide a valid email address"});
        
        const tutor = await Tutor.findOne({email});
        if(!tutor) return res.status(400).json({message: "Tutor with this email not found"});

        if(tutor.isBlocked) return res.status(400).json({message: "Your account has been blocked by the administrator. Please contact support."})

        const passwordResetToken = crypto.randomBytes(32).toString("hex");
        const hashedPasswordResetToken = crypto.createHash("sha256").update(passwordResetToken).digest("hex");

        tutor.passwordResetToken = hashedPasswordResetToken;
        tutor.passwordResetExpiry = Date.now() + 10 * 60 * 1000;
        await tutor.save();
        
        await sendPasswordResetEmail(tutor.email, passwordResetToken, "tutor");

        return res.status(200).json({
            success: true,
            message: "Check your email for the password reset link"
        });

    }catch(error){
        console.log("forgot password error", error);
        return res.status(500).json({message : "Something went wrong while sending the reset email. Please try again later."});
    }
}

export const resetPassword = async (req,res) => {
    try{
        const { password } = req.body;
        const passwordResetToken = req.params.token;

        const hashedPasswordResetToken = crypto.createHash("sha256").update(passwordResetToken).digest("hex");

        const tutor = await Tutor.findOne({
            passwordResetToken: hashedPasswordResetToken,
            passwordResetExpiry: { $gt: Date.now() } 
        });
        if(!tutor) return res.status(400).json({message: "Token is invalid or Expired"});
        
        tutor.password = password;
        tutor.passwordResetToken = undefined;
        tutor.passwordResetExpiry = undefined;
        await tutor.save();

        return res.status(200).json({
            success: true,
            message : "Password reset successful",
        })

    }catch(error){
        console.log("Reset password error", error);
        return res.status(500).json({message: "Tutor reset password error"});
    }
}