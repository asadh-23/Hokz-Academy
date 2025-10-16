import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/notFoundImage.png"

export default function NotFound() {

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#000000]">
      <img
        src={notFound}
        alt="404 Not Found"
        className="w-64 h-64 mb-6"
      />
      <h2 className="text-white text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-gray-200 mb-6">The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-teal-400 hover:bg-teal-500 text-white rounded-md font-semibold transition"
      >
        Return Home
      </button>
    </div>
  );
}
