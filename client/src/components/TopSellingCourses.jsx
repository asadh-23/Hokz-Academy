import React from "react";
import courseImage1 from "../assets/CourseImage1.jpg"
import courseImage2 from "../assets/CourseImage2.jpeg"
import courseImage3 from "../assets/CourseImage3.jpg"
import courseImage4 from "../assets/CourseImage4.png"
const courses = [
  {
    img: courseImage1,
    title: "Beginner's Guide to Design",
    author: "Ronald Richards",
    stars: 5,
    ratings: "1200",
    hours: 22,
    lectures: 155,
    level: "Beginner",
    price: "$149.9",
  },
  {
    img: courseImage2,
    title: "Beginner's Guide to Design",
    author: "Ronald Richards",
    stars: 5,
    ratings: "1200",
    hours: 22,
    lectures: 155,
    level: "Beginner",
    price: "$149.9",
  },
  {
    img: courseImage3,
    title: "Beginner's Guide to Design",
    author: "Ronald Richards",
    stars: 5,
    ratings: "1200",
    hours: 22,
    lectures: 155,
    level: "Beginner",
    price: "$149.9",
  },
  {
    img: courseImage4,
    title: "Beginner's Guide to Design",
    author: "Ronald Richards",
    stars: 5,
    ratings: "1200",
    hours: 22,
    lectures: 155,
    level: "Beginner",
    price: "$149.9",
  },
];

export default function TopSellingCourses() {
  return (
    <div className="px-8 py-8 bg-gradient-to-br from-teal-100 to-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Best Seller Courses</h2>
        <a href="#" className="text-xs text-green-500 font-medium">See All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-100 rounded-xl shadow-sm px-3 pt-3 pb-5 transition-all hover:shadow-lg"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-28 object-cover rounded-md mb-3"
            />
            <div className="font-semibold">{course.title}</div>
            <div className="text-xs text-gray-400 mb-1">By {course.author}</div>
            <div className="flex items-center text-xs mb-1">
              <span className="text-yellow-400 mr-1">★★★★★</span>
              <span className="ml-1 text-gray-400">{`(${course.ratings} Ratings)`}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
              {course.hours} Total Hours, {course.lectures} Lectures. {course.level}
            </div>
            <div className="font-bold text-lg text-gray-800">{course.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
