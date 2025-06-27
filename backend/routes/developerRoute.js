import express from "express";

//controllers
import { registerDeveloper, loginDeveloper, reviewKennel } from "../controllers/developerController.js";

//middlewares
import auth from "../middlewares/authMiddleware.js";
import verifyDeveloper from "../middlewares/verifyDeveloperMiddleware.js";

const router = express.Router();

//dev registration
router.post("/register", registerDeveloper);

//dev login
router.post("/login", loginDeveloper);

//approving/rejecting a kennel (for devs only)
router.patch("/kennel/:id/verify", auth, verifyDeveloper, reviewKennel);

export default router;