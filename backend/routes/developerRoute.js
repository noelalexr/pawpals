import express from "express";

//controllers
import { registerDev, loginDev } from "../controllers/developerController.js";
import { approveKennel, rejectKennel, listAllKennels, listPendingKennels } from "../controllers/approvalController.js";
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
router.patch("/kennel/:id/reject", auth, verifyDeveloper, rejectKennel);

// Get all kennels (approved + pending)
router.get("/kennels", auth, verifyDeveloper, listAllKennels);

// Get only pending kennels
router.get("/kennels/pending", auth, verifyDeveloper, listPendingKennels);

export default router;