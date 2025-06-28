import express from "express";
import {register, login, logout, validate} from "../controllers/authController.js"
import {auth} from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/register", auth, register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/validate", auth, validate)

export default router