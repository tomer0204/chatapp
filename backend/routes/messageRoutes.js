import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {getConversations, getMessage, sendMessage} from "../controller/messageController.js";

const router = express.Router();

router.post("/",protectRoute,sendMessage);
router.get("/:otherUserId",protectRoute,getMessage);
router.get("/conversations", protectRoute,getConversations);

export default router;