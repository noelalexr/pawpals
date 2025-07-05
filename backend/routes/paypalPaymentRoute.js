import express from "express";
import { paypalVerify } from "../controllers/paypalPaymentController.js";

const router = express.Router();

router.post("/paypal", paypalVerify);

export default router;