export const sendNotification = async ({ recipientId, senderId, postId, type, message, link }) => {
	try {
		console.log("notificationData", {
			recipientId,
			senderId,
			postId,
			type,
			message,
			link,
		});
		const res = await fetch("/api/notifications", {
			method: "POST",
			credentials:"include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				recipientId,
				senderId,
				postId,
				type,
				message,
				link,
			}),
		});
		return await res.json();
	} catch (error) {
		console.error("sendNotification error", error.message);
	}
};

