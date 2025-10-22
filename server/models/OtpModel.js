import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  // ✅ Used for registration or password reset (before or after user creation)
  email: {
    type: String,
    required: true,
    index: true
  },

  // ✅ To identify who this OTP belongs to
  role: {
    type: String,
    enum: ["User", "Tutor", "Admin"],
    required: true
  },

  // ✅ The actual OTP code
  otpCode: {
    type: String,
    required: true
  },

  // ✅ Auto delete after 5 minutes
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 minutes TTL
  }
});

// ✅ Optional: compound index for faster lookups
otpSchema.index({ email: 1, purpose: 1 });

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
