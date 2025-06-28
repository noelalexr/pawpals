import express from "express";
import {createPet, listPet, readPet, patchPet, deletePet, deletePetPhoto} from "../controllers/petController.js"
import {auth} from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", auth, createPet)
router.get("/", listPet)
router.get("/:id", readPet)
router.patch("/:id", auth, patchPet)
router.delete("/:id", auth, deletePet)
router.delete("/:id/photos/:publicId", auth, deletePetPhoto)

export default router