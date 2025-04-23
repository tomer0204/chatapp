import { sendNotification } from "./sendNotification.js";

export const handleMentions = async (text, postId, senderId) => {
	const mentionRegex = /@(\w+)/g;
	const mentions = text.match(mentionRegex);

	if (!mentions) return;

	const uniqueUsernames = [...new Set(mentions.map((m) => m.slice(1)))];

	for (const username of uniqueUsernames) {
		try {
			const res = await fetch(`/api/users/username/${username}`);
			const user = await res.json().catch(() => null);

			if (!user || user.error) continue;

			await sendNotification({
				recipientId: user._id,
				senderId,
				postId,
				type: "mention",
				message: `You were mentioned in a post`,
				link: `/${username}/post/${postId}`,
			});
		} catch (error) {
			console.error("Error in handleMentions:", error.message);
		}
	}
};

