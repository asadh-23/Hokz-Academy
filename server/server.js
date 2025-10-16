import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectDB from "./config/database.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}));

// USER ROUTER
import user_router from "./routes/userRoutes.js";
app.use("/user",user_router);

//TUTOR ROUTER
import tutor_router from "./routes/tutorRoutes.js";
app.use("/tutor",tutor_router);

//ADMIN ROUTER
import admin_router from "./routes/adminRoutes.js";
app.use("/admin",admin_router)


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port : ${PORT}`));