// AboutSection.jsx
import React from "react";
import aboutImage1 from "../assets/aboutImage.png";
import aboutImage2 from "../assets/aboutImage2.png";
import contactImage from "../assets/contactImage.png";
export default function AboutSection() {
    return (
        <>
            {/* About Section */}
            <section className="bg-white flex items-start justify-center py-16">
                <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between px-6 gap-8">
                    {/* Text content */}
                    <div className="md:w-2/3">
                        <span className="text-teal-500 font-bold mb-2 block">About Us</span>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            eLearning providing the best opportunities to the students around the globe.
                        </h1>
                        <p className="text-gray-500 mb-2">
                            Install our top-rated dropshipping app to your e-commerce site and get access to US Suppliers,
                            AliExpress vendors, and the best dropshipping and custom products. Start selling the right
                            products to the customer base that you know best. We connect you to inventory, so you can focus
                            on creating a catalog of profitable products for your online store.
                        </p>
                        <p className="text-gray-500">
                            Install our top-rated dropshipping app to your e-commerce site and get access to US Suppliers,
                            AliExpress vendors, and the best dropshipping and custom products. Start selling the right
                            products to the customer base that you know best. We connect you to inventory, so you can focus
                            on creating a catalog of profitable products for your online store.
                        </p>
                    </div>

                    {/* Images */}
                    <div className="md:w-1/3 relative flex items-center justify-center min-w-[240px]">
                        <img
                            src={aboutImage2}
                            alt="Students group"
                            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-white shadow-lg"
                        />
                        <img
                            src={aboutImage1}
                            alt="Campus"
                            className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full border-4 border-white shadow-md absolute bottom-[-10px] right-[-30px]"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="flex items-center justify-center bg-gradient-to-br from-teal-100 to-white py-20">
                <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-xl">
                    {/* Background image */}
                    <img src={contactImage} alt="Students" className="absolute inset-0 w-full h-full object-cover" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center py-16 px-8 bg-black/40">
                        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-6 drop-shadow">
                            Join by Creating Account <br /> or Start a Free Trial
                        </h2>
                        <p className="text-gray-100 mb-8 text-center max-w-2xl">
                            Install our top-rated dropshipping app to your e-commerce site and get access to US Suppliers,
                            AliExpress vendors, and the best dropshipping and custom products.
                        </p>
                        <button className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold text-lg bg-transparent hover:bg-white hover:text-teal-700 transition">
                            Contact Us &rarr;
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
