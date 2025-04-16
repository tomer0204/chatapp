import { atom } from "recoil";

const userAtom = atom({
	key: "userAtom",
	default: (() => {
		const storedUser = JSON.parse(localStorage.getItem("user-threads"));
		return storedUser?.user || storedUser || null;
	})(),
});

export default userAtom;