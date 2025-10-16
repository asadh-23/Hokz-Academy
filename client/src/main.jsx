import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner"; // ✅ import Toaster

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
            <Toaster
                position="top-right"
                richColors={true} // ✅ success=green, error=red automatically
                closeButton
                toastOptions={{
                    duration: 5000,
                    style: {
                        fontSize: "16px",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                    },
                }}
            />
        </BrowserRouter>
    </StrictMode>
);
