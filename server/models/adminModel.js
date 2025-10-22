import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        profileImage: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        lastActive: { type: Date },
        lastLogin: { type: Date },
    },
    { timestamps: true }
);

adminSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

adminSchema.methods.matchAdminPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
