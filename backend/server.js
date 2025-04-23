import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import messageRoutes from "./routes/messageRoutes.js";
import job from "./cron/cron.js";
import * as path from "node:path";
import {app, server} from "./socket/socket.js";
import notificationRoutes from "./routes/notificationRoutes.js";

connectDB();
job.start();

if (
	!process.env.CLOUDINARY_CLOUD_NAME||
	!process.env.CLOUDINARY_API_KEY||
	!process.env.CLOUDINARY_API_SECRET||
	!process.env.MONGODB_URI ||
	!process.env.JWT_SECRET
) {
	console.error(" Missing required environment variables");
	process.exit(1);
}

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/notifications",notificationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));