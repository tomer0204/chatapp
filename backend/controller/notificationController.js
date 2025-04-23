import Notification from "../models/notificationModel.js"


const createNotification = async(req,res) =>{
	try {
		console.log("Request body:", req.body);
		console.log("User from protectRoute:", req.user);
		const { recipientId, postId, type, message, link } = req.body;
		if (!req.user || !req.user._id) {
			return res.status(401).json({ error: "Unauthorized - missing user" });
		}

		if (recipientId === req.user._id.toString()) {
			return res.status(400).json({ error: "Can't notify yourself" });
		}
		const notification = new Notification({
			recipientId,
			senderId: req.user._id,
			postId,
			type,
			message,
			link,
		});


		await notification.save();
		res.status(201).json(notification);
	} catch (error) {
		console.error("Error creating notification:", error);
		res.status(500).json({ error: error.message || "Failed to create notification" });
	}
};

const getNotifications = async(req,res) =>{
	try {

		const notifications = await Notification.find({
			recipientId: req.user._id
		})
			.sort({ createdAt: 1 })
			.limit(99)
			.populate("senderId", "username avatar");

		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ error: "Failed to get notifications" });
	}
};
const markNotificationsAsRead = async (req, res) => {
	try {
		const userId = req.params.userId;
		await Notification.updateMany(
			{ recipientId: userId, isRead: false },
			{ $set: { isRead: true } }
		);
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ error: "Failed to update notifications" });
	}
};

export {getNotifications,createNotification,markNotificationsAsRead };
