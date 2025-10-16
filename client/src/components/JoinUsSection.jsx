import React from "react";

export default function JoinUsSection() {
  return (
    <div className="bg-[#f5f8fa] min-h-screen flex flex-col pt-14 pb-0">
      {/* Top Section */}
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        {/* Instructor Block */}
        <div className="flex gap-8 items-center">
          <div className="relative w-60 h-60 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-200 rounded-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80"
              alt="Instructor"
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-md border-[10px] border-green-100"
            />
          </div>
          <div>
            <div className="text-green-600 font-semibold mb-2">Join Us</div>
            <div className="font-bold text-xl mb-3">Become an Instructor</div>
            <p className="text-gray-700 mb-4 text-[15px] leading-relaxed max-w-md">
              Inspire, host and generate value. Share knowledge, build &amp; build in one community, and own platform.
            </p>
            <button className="bg-green-600 text-white text-sm px-6 py-2 rounded-md hover:bg-green-700 transition font-semibold">
              Start Your Instructor Journey &rarr;
            </button>
          </div>
        </div>

        {/* Learner Block */}
        <div className="flex gap-8 items-center flex-row-reverse">
          <div className="relative w-60 h-60 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-200 rounded-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=400&q=80"
              alt="Learner"
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-md border-[10px] border-yellow-100"
            />
          </div>
          <div>
            <div className="font-bold text-xl mb-3 max-w-md">Transform your life through education</div>
            <p className="text-gray-700 mb-4 text-[15px] leading-relaxed max-w-md">
              Explore new world &amp; specialties. Learn new skills, and get extra flexible with our supportive community.
            </p>
            <button className="bg-yellow-400 text-gray-900 text-sm px-6 py-2 rounded-md hover:bg-yellow-500 transition font-semibold">
              Explore Courses &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Bottom Section with blue background and centered black box */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-teal-100 to-white rounded-xl px-10 py-12 text-center shadow-xl">
  <h3 className="text-2xl font-bold mb-4 leading-relaxed text-gray-800">
    Join Us by Creating Account <br /> or Start a Free Trial
  </h3>
  <p className="text-gray-600 mb-10 max-w-xl mx-auto text-base leading-relaxed">
    Install our top-rated elearning app so you can customize sites as your needs &amp; goals.
    All resources, supports, and the best methodology—join our learners.
  </p>
  <div className="flex justify-center gap-6">
    <button className="bg-green-600 hover:bg-green-500 transition text-white px-8 py-3 rounded-full font-semibold">
      Get Started
    </button>
    <button className="bg-gray-900 border border-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
      Learn More
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
