import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
	recipientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
	type: {
		type: String,
		enum: ["mention", "like", "comment", "message", "follow"],
		required: true
	},
	message: {
		type: String,
		required: true
	},
	isRead: {
		type: Boolean,
		default: false
	},
	link:{
		type:String,
		required:true,
	},
},
	{timestamps: true}
);
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;