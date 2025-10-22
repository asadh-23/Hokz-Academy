import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicAxios } from "../../api/axios";
import { toast } from "sonner";

const RESEND_INTERVAL = 300; // 5 mins

export default function OtpVerify() {
  const location = useLocation();
  const otpData = JSON.parse(localStorage.getItem("otpData"));
  const email = location.state?.email || otpData?.email;
  const role  = location.state?.role  || otpData?.role;



  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const [timer, setTimer] = useState(RESEND_INTERVAL);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    
    const savedTimestamp = localStorage.getItem("otpTimestamp");
    if (savedTimestamp) {               
      const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
      if (elapsed < RESEND_INTERVAL) {
        setTimer(RESEND_INTERVAL - elapsed);
        setResendDisabled(true);
      } else {
        setTimer(0);
        setResendDisabled(false);
        localStorage.removeItem("otpTimestamp");
      }
    } else {                
      setTimer(RESEND_INTERVAL);
      setResendDisabled(true);
      localStorage.setItem("otpTimestamp", Date.now().toString());
    }
  }, []);


  useEffect(() => {
    
    if (resendDisabled && timer > 0) {        
          
      const interval = setInterval(() => {              
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            setTimer(0);
            localStorage.removeItem("otpTimestamp");
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);}

  }, [resendDisabled, timer]);

  const handleChange = (idx, e) => {
    if (/^\d?$/.test(e.target.value)) {
      const newOtp = [...otp];
      newOtp[idx] = e.target.value;
      setOtp(newOtp);
      if (e.target.value && idx < otp.length - 1) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      return toast.error("Please enter a 6-digit OTP");
    }

    try {
      const response = await publicAxios.post(`/${role}/verify-otp`, {
        email,
        otpCode,
      });
      if (response.data?.success) {
        toast.success(response.data?.message);
        localStorage.removeItem("otpTimestamp");
         localStorage.removeItem("otpData");
        navigate(`/`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      setTimer(RESEND_INTERVAL);
      setResendDisabled(true);
      setOtp(Array(6).fill(""));
      localStorage.setItem("otpTimestamp", Date.now().toString());

      const response = await publicAxios.post(`/${role}/resend-otp`, {
        email,
      });

      if (response.data?.success) {
        toast.success(response.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error("Error resending OTP");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eddfc3]">
      <div className="bg-white rounded-3xl px-8 py-10 shadow-2xl max-w-md w-full flex flex-col items-center text-center relative">
        <button
            className="absolute right-8 top-7 text-xl text-gray-400 hover:text-gray-700"
            onClick={()=>{navigate(`/${role}/register`)}}>
          &times;
        </button>
        {/* Better Email Icon */}
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D94D22" className="w-16 h-16 mx-auto">
            <rect x="3" y="6" width="18" height="12" rx="3" fill="#FFB347" />
            <path strokeLinecap="round" strokeLinejoin="round" stroke="#D94D22" strokeWidth={1.5} d="M3 8l9 6 9-6" />
            <circle cx="20" cy="18" r="2" fill="white" />
            <circle cx="20" cy="18" r="1" fill="#D94D22" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Verify Your Email Address
        </h2>
        <p className="text-xs text-gray-500 mb-7 max-w-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed diam nonummy
          nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        </p>
        <div className="flex gap-5 mb-7">
          {otp.map((val, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-14 h-16 text-center font-bold text-2xl rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                val ? "border-orange-400" : "border-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="mb-6 text-sm">
          Want to Change Your Email Address?
          <Link
            to={`/${role}/register`}
            className="underline font-semibold ml-1 text-gray-800 hover:text-orange-500"
          >
            Change Here
          </Link>
        </div>
        <button
          onClick={handleVerify}
          className="bg-orange-400 hover:bg-orange-500 transition font-bold text-white px-14 py-3 rounded-full mb-3 shadow"
        >
          Verify Email
        </button>
        <button
          onClick={handleResend}
          disabled={resendDisabled}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            resendDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-400 text-white hover:bg-orange-100 cursor-pointer"
          }`}
          aria-disabled={resendDisabled}
        >
          {resendDisabled
            ? `Resend OTP in ${Math.floor(timer / 60)} : ${(timer % 60)
                .toString()
                .padStart(2, "0")}`
            : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}
