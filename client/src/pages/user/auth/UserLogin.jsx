import React, { useState } from "react";
import AuthLayout from "../../../components/auth/AuthLayout";
import { toast } from "sonner";
import axiosInstance from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanData = {
            ...formData,
            email: formData.email.trim(),
        };

        if (!cleanData.email || !cleanData.password) {
            return toast.error("Please fill all required fields");
        }

        try {
            const response = await axiosInstance.post("/user/login", cleanData);

            if (response.data.success) {
                toast.success(response.data.message || "Login successful");
                navigate("/");
            }
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AuthLayout subtitle="Log In" isLogin={true}>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 drop-shadow-md">Login to your account</h2>
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="Email"
                        className="w-full rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span className="absolute left-6 top-3.5 text-gray-400">
                        <i className="fas fa-envelope" />
                    </span>
                </div>

                {/* Password */}
                <div className="relative">
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                        className="w-full rounded-full border border-gray-300 px-6 py-3 pr-12 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span className="absolute right-4 top-3.5 text-gray-400 cursor-pointer">
                        <i className="fas fa-eye-slash" />
                    </span>
                    <span className="absolute left-6 top-3.5 text-gray-400">
                        <i className="fas fa-lock" />
                    </span>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right mb-2">
                    <Link
                        to="/user/forgot-password"
                        className="text-gray-400 hover:text-gray-700 hover:underline text-sm font-medium"
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-400 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:bg-teal-500 transition-all"
                >
                    Login
                </button>
            </form>

            {/* Google Login Divider */}
            <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200" />
                <span className="mx-2 text-xs text-gray-400">or</span>
                <div className="flex-1 border-t border-gray-200" />
            </div>
        </AuthLayout>
    );
}
