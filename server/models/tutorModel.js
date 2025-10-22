import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const tutorSchema = new mongoose.Schema(
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
        phoneNo: {
            type: String,
            unique: true,
            trim: true,
            required: function () {
                return !this.googleId;
            },
            sparse: true,
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId;
            },
        },
        googleId: {
            type: String,
            default: null,
            unique: true,
        },
        profileImage: {
            type: String,
            default: null,
        },
        bio: {
            type: String,
            default: "",
        },
        subject: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
        tutorId: {
            type: String,
            required: true,
            unique: true,
        },
        fcmToken: {
            type: String,
            default: null,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "courses",
            },
        ],
        isVerified: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpiry: {
            type: Date,
        },
        lastActive: { type: Date },
        lastLogin: { type: Date },
        notifications: [notificationSchema], // Added notifications array
    },
    { timestamps: true }
);

tutorSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});
tutorSchema.methods.matchTutorPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;
