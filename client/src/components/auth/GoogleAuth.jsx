import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleAuth() {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try{

            const decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded); // contains name, email, picture, etc.
    
            
                const response = await axiosInstance.post("/user/google-auth", {
                    email: decoded.email,
                    name: decoded.name,
                    googleId: decoded.sub,
                    profilePic: decoded.picture,
                });
    
                if (response.data?.success) {
                    toast.success(response.data?.message);
                    navigate("/");
                }
                console.log(response.data);
        }catch(error){
            toast.error(error.response?.data?.message) || "Google login failed";
            console.log(error.response?.data?.message);
        }
        
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="flex justify-center mt-6">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => toast.error("Google login failed")}
                    shape="pill"
                    text="signin_with"
                    size="large"
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                    style={{
                        background: "linear-gradient(90deg, #b8860b 0%, #008080 100%)",
                        border: "2px solid #805a00", // dark golden border color
                        fontWeight: "700",
                        fontSize: "1rem",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "9999px",
                        width: "280px",
                        boxShadow: "0 8px 20px rgba(184, 134, 11, 0.6)",
                    }}
                />
            </div>
        </GoogleOAuthProvider>
    );
}
