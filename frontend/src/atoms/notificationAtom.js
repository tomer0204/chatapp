import {atom} from "recoil"

const notificationAtom = atom({
	key:"notificationAtom",
	default: {
		unreadCount: 0,
		notifications: []
	}
});

export default notificationAtom;