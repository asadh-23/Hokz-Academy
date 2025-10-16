import React from "react";

export default function Header({ user }) {
    return (
        <>
            <header className="flex items-center justify-between px-12 pt-8">
                <h1 className="text-2xl font-bold text-teal-700">{import.meta.env.VITE_APP_NAME}</h1>
                <nav className="flex space-x-8 text-teal-700 font-medium">
                    <a href="#">Home</a>
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                    <a href="#">Courses</a>
                    <a href="#">Tutors</a>
                </nav>
                {user ? (
                    <h1>Lets go</h1>
                ) : (
                    <button className="bg-teal-600 text-white rounded-full px-6 py-2 font-medium shadow hover:bg-teal-700">
                        Login
                    </button>
                )}
            </header>
        </>
    );
}
