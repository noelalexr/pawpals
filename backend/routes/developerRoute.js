import express from "express";

//controllers
import { registerDev, loginDev, logoutDev, validateDev } from "../controllers/developerController.js";
import { approveKennel, rejectKennel } from "../controllers/approvalController.js";
//middlewares
import {auth} from "../middlewares/authMiddleware.js";
import {verifyDeveloper} from "../middlewares/verifyDeveloperMiddleware.js";

const router = express.Router();

// Developer registration and login
router.post("/register", registerDev);
router.post("/login", loginDev);
router.post("/logout", logoutDev)
router.get("/validate", auth, verifyDeveloper, validateDev)

// Approve kennel
router.patch("/kennel/:id/approve", auth, verifyDeveloper, approveKennel);

// Reject & delete kennel
router.patch("/kennel/:id/reject", auth, verifyDeveloper, rejectKennel);

export default router;
