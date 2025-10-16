import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../../api/axios";

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const {token} = useParams()

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 5) {
            return toast.error("Password must be at least 5 characters.");
        }
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match.");
        }
        try{
            const response = await axiosInstance.post(`/user/reset-password/${token}`, {password : formData.password});
            if(response.data?.success){
                console.log("Reset password successful");
                toast.success(response.data?.message);
                navigate("/user/login");
            }
        }catch(error){
            console.log("Reset password error", error.response?.data?.message);
            toast.error(error.response?.data?.message,"Reset password failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 via-teal-50 to-teal-100 px-4">
            <div className="w-full max-w-md rounded-3xl shadow-2xl bg-white px-10 py-8 flex flex-col items-center mt-20 transform transition-transform hover:scale-105">
                {/* Logo */}
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center mr-3 shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="url(#grad1)" />
                            <defs>
                                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#14b8a6" />
                                    <stop offset="100%" stopColor="#2dd4bf" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="font-extrabold text-2xl text-gray-900 tracking-wide">Hokz Academy</span>
                </div>
                {/* Title */}
                <h2 className="text-3xl font-bold mb-4 text-gray-900 drop-shadow-md">Reset Your Password</h2>
                <p className="text-gray-500 text-sm mb-8 text-center px-8">
                    Enter your new password below. It must be at least 5 characters long.
                </p>
                {/* Form */}
                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    {/* Password */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full rounded-full border border-gray-300 px-6 py-3 pr-12 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            required
                        />
                        <span className="absolute right-4 top-3.5 text-gray-400 cursor-pointer">
                            <i className="fas fa-eye-slash"></i>
                        </span>
                    </div>
                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full rounded-full border border-gray-300 px-6 py-3 pr-12 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            required
                        />
                        <span className="absolute right-4 top-3.5 text-gray-400 cursor-pointer">
                            <i className="fas fa-eye-slash"></i>
                        </span>
                    </div>
                    {/* Reset Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-400 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:bg-teal-500 transition-all"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="text-xs text-gray-400 mt-6">
                    If you remember your password,{" "}
                    <span
                        className="text-teal-500 cursor-pointer font-semibold hover:underline"
                        onClick={() => navigate("/user/login")}
                    >
                        Login here
                    </span>
                </div>
            </div>
        </div>
    );
}
