import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import notificationAtom from "../atoms/notificationAtom";
import userAtom from "../atoms/userAtom";

const useNotifications = () => {
	const user = useRecoilValue(userAtom);
	const setNotification = useSetRecoilState(notificationAtom);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const res = await fetch(`/api/notifications`);
				if (!res.ok)  new Error("Failed to fetch notifications");

				const data = await res.json();

				const formatted = data.map((n) => ({
					...n,
					text: n.message,
					avatar: n.senderId?.avatar || "",
				}));

				setNotification({
					unreadCount: formatted.filter((n) => !n.isRead).length,
					notifications: formatted
				});
			} catch (err) {
				console.error("Error fetching notifications", err);
			}
		};

		if (user?._id) {
			fetchNotifications();
		}
	}, [user, setNotification]);
};

export default useNotifications;
