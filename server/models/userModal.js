import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const notificationSchema = new mongoose.Schema(
    {
        message : {
        type : String,
        required : true,
        },
        read : {
        type : Boolean,
        default : false,
        },
        timestamp : {
        type : Date,
        default : Date.now,
        },
    }
);

const userSchema = mongoose.Schema(
    {
        full_name : {
            type : String,
            trim : true,
            required : true,
        },
        email : {
            type : String,
            trim : true,
            required : true,
            unique : true,
            lowercase : true,
        },
        googleId : {
            type : String,
            default : null,
        },
        phoneNo : {
            type : String,
            unique: true,
            trim : true,
            required : function () {
                return !this.googleId;
            },
            sparse : true,
        },
        password : {
            type : String,
            required : function () {
                return !this.googleId;
            },
        },
        user_id : {
            type : String,
            required : true,
            unique : true,
        },
        refreshToken : {
            type : String,
            default : null,
        },
        profileImage : {
            type : String,
            default : null,
        },
        status : {
            type : Boolean,
            default : null,
        },
        fcmToken : {
            type : String,
            default : null,
        },
        courses : [
            {
                course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
                enrollmentDate: { type: Date, default: Date.now },
                progress: { type: Number, default: 0 },
                completionStatus: { type: Boolean, default: false }
            },
        ],
        wallet : {
            type : Number,
            default : 0,
            min : [0, "Wallet balance cannot be negative"]
        },
        is_verified : {
            type : Boolean,
            default : false,
        },
        is_block : {
            type : Boolean,
            default : false,
        },
        lastActive : {
            type : Date,
        },
        lastLogin : {
            type : Date,
        },
        otp : {
            type : String,
        },
        otpExpiry : {
            type : Date,
        },
        passwordResetToken : {
            type : String,
        },
        passwordResetExpiry : {
            type : Date,
        },
        notifications: [notificationSchema],
    },
    {
        timestamps : true
    }
    
);

// Pre-save: Hash password before saving new or modified user
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || 10 ));
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model("User",userSchema);