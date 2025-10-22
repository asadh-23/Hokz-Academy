import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/auth/AdminLogin";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} />
        </Routes>
    );
}
