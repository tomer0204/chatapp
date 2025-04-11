import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";



if (
	!process.env.CLOUDINARY_URL||
	!process.env.MONGODB_URI ||
	!process.env.JWT_SECRET
) {
	console.error("❌ Missing required environment variables");
	process.exit(1);
}

const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
	CLOUDINARY_URL: process.env.CLOUDINARY_URL,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`✅ Server started at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error("❌ Failed to connect to DB or start server:", err.message);
		process.exit(1);
	}
};

startServer();
