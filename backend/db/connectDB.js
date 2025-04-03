import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`Connected to DB: ${conn.connection.host}`);
	} catch (error) {
		console.error('error:', error);
		process.exit(1);
	}
}
export default connectDB;