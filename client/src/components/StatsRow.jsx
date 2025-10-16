import React from "react";

const stats = [
  { label: "250+", sub: "Courses by our best mentors" },
  { label: "1000+", sub: "Courses by our best mentors" },
  { label: "15+", sub: "Courses by our best mentors" },
  { label: "2400+", sub: "Courses by our best mentors" },
];

export default function StatsRow() {
  return (
    <div className="bg-blue-50 py-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex-1 text-center"
          >
            <div className="text-2xl font-bold text-gray-800">
              {stat.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stat.sub}
            </div>
            {idx < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-10 border-r border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
