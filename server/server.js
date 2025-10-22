import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectDB from "./config/database.js";

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
import userRouter from "./routes/userRoutes.js";
app.use("/api/user",userRouter);

//TUTOR ROUTER
import tutorRouter from "./routes/tutorRoutes.js";
app.use("/api/tutor",tutorRouter);

//ADMIN ROUTER
import adminRouter from "./routes/adminRoutes.js";
app.use("/api/admin",adminRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port : ${PORT}`));