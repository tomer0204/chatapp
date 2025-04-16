import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
} from "../controller/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/user/:username", getUserPosts);
router.get("/feed", protectRoute, getFeedPosts);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);
router.delete("/:id", protectRoute, deletePost);
router.get("/:id", getPost);

export default router;
