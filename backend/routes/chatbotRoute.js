import express from "express";
import recommendPet from "../controllers/chatbotController.js";

const router = express.Router();
router.post("/chat", recommendPet);

export default router;