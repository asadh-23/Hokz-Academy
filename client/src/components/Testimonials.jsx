import React from "react";

const reviews = [
  {
    text: `"Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia."`,
    name: "Jane Doe",
    title: "Designer",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: `"Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia."`,
    name: "Jane Doe",
    title: "Designer",
    img: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    text: `"Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia."`,
    name: "Jane Doe",
    title: "Designer",
    img: "https://randomuser.me/api/portraits/women/46.jpg"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-blue-50 py-12">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">
      What Our Customer Say
    </h2>
    <h3 className="text-lg font-semibold text-gray-700 mb-8">
      About Us
    </h3>
    <div className="flex gap-6">
      {reviews.map((review, idx) => (
        <div
          key={idx}
          className="rounded-3xl p-6 flex-1 bg-white shadow 
                     border-2 border-transparent hover:border-teal-400 
                     transition duration-300"
        >
          <div className="text-teal-500 text-3xl mb-2">“</div>
          <div className="text-gray-700 mb-5 text-[15px] leading-relaxed">
            {review.text}
          </div>
          <div className="flex items-center mt-4">
            <img
              src={review.img}
              alt={review.name}
              className="w-10 h-10 rounded-full border-2 border-white mr-3"
            />
            <div>
              <div className="font-semibold text-gray-800">{review.name}</div>
              <div className="text-xs text-gray-400">{review.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-end gap-3 mt-6 mr-4">
      <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
        <span className="text-xl text-gray-400">&#8592;</span>
      </button>
      <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
        <span className="text-xl text-gray-400">&#8594;</span>
      </button>
    </div>
  </div>
</div>

  );
}
