import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import LandingPage from "./pages/landingPage/LandingPage";
import NotFound from "./pages/common/NotFound";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/user/*" element={<UserRoutes />} />
                <Route path="/tutor/*" element={<TutorRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
