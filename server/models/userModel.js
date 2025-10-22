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
        fullName : {
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
        isVerified : {
            type : Boolean,
            default : false,
        },
        isBlocked : {
            type : Boolean,
            default : false,
        },
        lastActive : {
            type : Date,
        },
        lastLogin : {
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
    try{
        if(!this.isModified('password')) return next();
    
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10" ));
        this.password = await bcrypt.hash(this.password, salt);
    
        next();

    }catch(error){
        next(error);
    }
});

userSchema.methods.matchUserPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User",userSchema);

export default User;