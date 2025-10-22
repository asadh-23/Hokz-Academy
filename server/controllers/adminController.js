import { setAuthTokens } from "../helpers/tokenHelpers.js";
import Admin from "../models/adminModel.js";


export const loginAdmin = async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({message: "All fields are required"});

        const admin = await Admin.findOne({email});
        if(!admin && !admin.isActive) return res.status(400).json({message: "Invalid Email or Password"});

        const isPasswordValid = await admin.matchAdminPassword(password);
        if(!isPasswordValid) return res.status(400).json({message: "Invalid Email or Password"});

        const accessToken = setAuthTokens(res, admin);
        admin.lastLogin = new Date();
        const savedAdmin = await admin.save();

        return res.status(200).json({
            success: true,
            message: "Welcome back admin",
            accessToken,
            admin: {
                name: savedAdmin.fullName,
                email: savedAdmin.email,
                adminId: savedAdmin.adminId,
                profileImage: savedAdmin.profileImage,
            }
        });

    }catch(error){
        console.log("Admin login error", error);
        return res.status(500).json({message: "Admin Login failed"});
    }
}