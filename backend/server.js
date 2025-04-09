import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());// To parse json data in the body.
app.use(express.urlencoded({ extended: false }));// To parse form data in the req.body
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes)


app.listen(PORT,()=>console.log(`server started at http://localhost:${PORT}`));

