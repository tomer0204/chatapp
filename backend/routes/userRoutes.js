import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
} from "../controller/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/suggested", protectRoute, getSuggestedUsers);
router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/freeze", protectRoute, freezeAccount);
router.put("/update/:id", protectRoute, updateUser);

export default router;