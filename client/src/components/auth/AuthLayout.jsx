import React from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

export default function AuthLayout({ subtitle, role, children }) {
    const location = useLocation();
    const isRegister = location.pathname.includes("register");
    const isLogin = location.pathname.includes("login");

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-teal-100 via-teal-50 to-teal-100 px-4">
            <div className="w-full max-w-lg rounded-3xl shadow-2xl bg-white px-10 py-8 flex flex-col items-center mt-20 transition-transform duration-300 hover:scale-105">
                {/* Top: Logo + Tabs + Subtitle */}
                <div className="w-full flex flex-col items-center mb-4">
                    {/* Logo */}
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center mr-2 shadow-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="12" fill="url(#grad1)" />
                                <defs>
                                    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#14b8a6" />
                                        <stop offset="100%" stopColor="#2dd4bf" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-gray-700">{import.meta.env.VITE_APP_NAME}</span>
                    </div>

                    {/* Tabs: Show only if role is NOT admin */}
                    {role !== "admin" && (
                        <div className="flex bg-gray-200 rounded-full p-1 mb-4 w-full max-w-xs mx-auto sticky top-0 z-20 shadow-inner">
                            <Link
                                to={`/${role}/register`}
                                className={`flex-1 py-1.5 text-center rounded-full font-semibold text-sm transition-colors ${
                                    isRegister ? "bg-teal-400 text-white shadow" : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                Register
                            </Link>
                            <Link
                                to={`/${role}/login`}
                                className={`flex-1 py-1.5 text-center rounded-full font-semibold text-sm transition-colors ${
                                    isLogin ? "bg-teal-400 text-white shadow" : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                Login
                            </Link>
                        </div>
                    )}

                    {/* Subtitle */}
                    <p className="text-gray-500 text-sm mb-8 text-center px-8">
                        Fill in the information below to {subtitle}
                    </p>
                </div>

                {/* Children form area */}
                {/* Children form area */}
                <div className="w-full px-10 pb-8 flex-1 flex flex-col justify-start">
                    {children}
                    {role !== "admin" && <GoogleAuth role={role} />}
                </div>
            </div>
        </div>
    );
}
