import AuthLayout from "../../../components/auth/AuthLayout";
import { toast } from "sonner";
import axiosInstance from "../../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phoneNo: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanData = {
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phoneNo: formData.phoneNo.trim(),
        };

        if (!cleanData.name || !cleanData.phoneNo || !cleanData.email || !cleanData.password) {
            return toast.error("Please fill all required fields");
        }

        if (cleanData.password !== cleanData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        if (cleanData.password.length < 5) {
            return toast.error("Password must be at least 5 characters");
        }

        if (!/^(\+91)?\d{10}$/.test(cleanData.phoneNo)) {
            return toast.error("Enter a valid 10-digit phone number");
        }

        try {
            const response = await axiosInstance.post("/user/register", cleanData);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/user/verify-otp", { state: { email: response.data.email } });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.log(error.response?.data?.message);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AuthLayout subtitle="Sign Up">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 drop-shadow-md">Create your account</h2>
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone */}
                <div className="relative">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-full border border-gray-300 px-6 py-3 pr-12 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <span className="absolute right-4 top-3.5 text-gray-400 cursor-pointer">
                        <i className="fas fa-eye-slash"></i>
                    </span>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-400 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:bg-teal-500 transition-all"
                >
                    Register
                </button>
            </form>

        </AuthLayout>
    );
}
