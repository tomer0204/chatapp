import express from 'express';
import {createNotification, getNotifications, markNotificationsAsRead} from "../controller/notificationController.js";
import protectRoute from "../middlewares/protectRoute.js";


const router = express.Router();

router.post("/", protectRoute,createNotification);
router.get("/", protectRoute, getNotifications);
router.put("/read/:userId", protectRoute, markNotificationsAsRead);




export default router;