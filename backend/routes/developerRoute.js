import express from "express";

//controllers
import { registerDev, loginDev } from "../controllers/developerController.js";
import { approveKennel, rejectKennel } from "../controllers/approvalController.js";
//middlewares
import {auth} from "../middlewares/authMiddleware.js";
import {verifyDeveloper} from "../middlewares/verifyDeveloperMiddleware.js";

const router = express.Router();

//dev registration
router.post("/register", registerDev);

//dev login
router.post("/login", loginDev);

// Approve kennel
router.patch("/kennel/:id/approve", auth, verifyDeveloper, approveKennel);

// Reject & delete kennel
router.delete("/kennel/:id/reject", auth, verifyDeveloper, rejectKennel);

export default router;