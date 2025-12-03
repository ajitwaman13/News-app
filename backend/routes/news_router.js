import express from "express";
import { AllNews } from "../controller/news_controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/all", auth, AllNews);

export default router;
