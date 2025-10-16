import React from "react";
import heroImg from "../assets/hero-image.jpg";
import { Link } from "react-router-dom";
export default function HeroBlock({ user }) {
    return (
        <>
            <section className="flex flex-col md:flex-row items-center justify-center px-12 py-16">
                <div className="md:w-1/2">
                    <div className="border-teal-400 border-2 rounded-2xl p-8">
                        <h2 className="text-4xl font-bold text-teal-900 mb-4 leading-tight">
                            You bring the <span className="text-yellow-600 font-bold">expertise</span>,<br />
                            we&apos;ll make it unforgettable.
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Using highly personalized activities, videos, and anamimes, they can engage in a ge edaisioe and
                            evilielis files to ollidie thik learning goals as they
                        </p>
                        {user ? (
                            <h1>Lets Go</h1>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/user/register" className="bg-yellow-500 text-white rounded-full px-8 py-2 font-bold shadow hover:bg-yellow-600">
                                    Register
                                </Link>
                                <button className="bg-teal-900 text-white rounded-full px-8 py-2 font-bold shadow hover:bg-teal-800">
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
                    <div className="rounded-2xl border-4 border-teal-400 p-2 bg-white shadow-xl">
                        <img src={heroImg} alt="Group Learning" className="rounded-xl w-[380px] h-[260px] object-cover" />
                    </div>
                </div>
            </section>
            {/* SERVICES CARDS */}
            <section className="bg-teal-700 py-4 px-8 flex gap-6 justify-center">
                <div className="bg-teal-600 rounded-xl p-8 flex flex-col items-center w-1/4 shadow-lg">
                    <span className="mb-2 text-white text-xl font-bold">Web Development</span>
                    <span className="text-teal-200">Build your online presence</span>
                </div>
                <div className="bg-teal-600 rounded-xl p-8 flex flex-col items-center w-1/4 shadow-lg">
                    <span className="mb-2 text-white text-xl font-bold">User Experience</span>
                    <span className="text-teal-200">Craft intuitive interfaces</span>
                </div>
                <div className="bg-teal-600 rounded-xl p-8 flex flex-col items-center w-1/4 shadow-lg">
                    <span className="mb-2 text-white text-xl font-bold">Marketing</span>
                    <span className="text-teal-200">Grow your brand audience</span>
                </div>
            </section>
        </>
    );
}
