import React from "react";

const categories = [
  {
    title: "Design",
    courses: 11,
    icon: (
      <div className="bg-green-100 mx-auto mb-2 w-12 h-12 flex items-center justify-center rounded">
        {/* Replace with actual icon */}
        <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" /><rect x="10" y="10" width="8" height="4" fill="#22C55E" /></svg>
      </div>
    ),
    border: "border-green-400",
    shadow: "shadow-green-100/40",
    text: "text-green-600",
  },
  {
    title: "Development",
    courses: 11,
    icon: (
      <div className="bg-blue-100 mx-auto mb-2 w-12 h-12 flex items-center justify-center rounded">
        {/* Replace with actual icon */}
        <svg width="24" height="24" fill="none"><rect x="6" y="7" width="12" height="10" rx="2" fill="#3B82F6" /></svg>
      </div>
    ),
    border: "border-blue-400",
    shadow: "shadow-blue-100/40",
    text: "text-blue-600",
  },
  {
    title: "Development",
    courses: 11,
    icon: (
      <div className="bg-blue-100 mx-auto mb-2 w-12 h-12 flex items-center justify-center rounded">
        {/* Replace with actual icon */}
        <svg width="24" height="24" fill="none"><ellipse cx="12" cy="12" rx="8" ry="5" stroke="#38BDF8" strokeWidth="2" /></svg>
      </div>
    ),
    border: "border-sky-400",
    shadow: "shadow-sky-100/40",
    text: "text-sky-600",
  },
  {
    title: "Business",
    courses: 11,
    icon: (
      <div className="bg-cyan-100 mx-auto mb-2 w-12 h-12 flex items-center justify-center rounded">
        {/* Replace with actual icon */}
        <svg width="24" height="24" fill="none"><rect x="7" y="8" width="10" height="8" rx="2" fill="#06B6D4" /></svg>
      </div>
    ),
    border: "border-cyan-400",
    shadow: "shadow-cyan-100/40",
    text: "text-cyan-600",
  },
  {
    title: "Data sience",
    courses: 11,
    icon: (
      <div className="bg-cyan-100 mx-auto mb-2 w-12 h-12 flex items-center justify-center rounded">
        {/* Replace with actual icon */}
        <svg width="24" height="24" fill="none"><rect x="7" y="8" width="10" height="8" rx="2" fill="#06B6D4" /></svg>
      </div>
    ),
    border: "border-cyan-400",
    shadow: "shadow-cyan-100/40",
    text: "text-cyan-600",
  },
 
];

export default function TopCategories() {
  return (
    <div className="px-8 py-6 bg-gradient-to-br from-teal-100 to-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Top Categories</h2>
        <a href="#" className="text-xs text-green-500 font-medium">See All</a>
      </div>
      <div className="flex flex-wrap gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`w-56 bg-white border ${cat.border} rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col items-center`}
          >
            {cat.icon}
            <div className="font-bold text-xl text-gray-800 text-center mb-2">{cat.title}</div>
            <div className={`text-sm font-semibold ${cat.text}`}>
              {cat.courses} Courses
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
