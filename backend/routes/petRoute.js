import express from "express";
import {createPet, listPet, listMyPets, readPet, patchPet, deletePet, deletePetPhoto} from "../controllers/petController.js"
import {auth} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/upload.js";

const router = express.Router()

router.post("/", auth, upload.array("images", 3), createPet);
router.get("/", listPet);
router.get("/mine", auth, listMyPets);
router.get("/:id", readPet);
router.patch("/:id", auth, upload.array("images", 3), patchPet);
router.delete("/:id", auth, deletePet);
router.delete("/:id/photos/:publicId", auth, deletePetPhoto);

export default router