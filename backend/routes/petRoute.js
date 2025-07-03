import express from "express";
<<<<<<< HEAD
import { createPet, listPet, listMyPets, readPet, readMyPet, patchPet, deletePet, deletePetPhoto } from "../controllers/petController.js"
=======
import { createPet, listPet, listMyPets, readMyPet, patchPet, deletePet, deletePetPhoto } from "../controllers/petController.js"
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
import { auth } from "../middlewares/authMiddleware.js"
import upload from "../middlewares/upload.js";

const router = express.Router()

router.post("/", auth, upload.array("images", 3), createPet);
router.get("/", listPet);
router.get("/mine", auth, listMyPets);
router.get("/mine/:id", auth, readPet);
router.patch("/mine/:id", auth, upload.array("images", 3), patchPet);
router.delete("/mine/:id", auth, deletePet);
router.delete("/mine/:id/photos/:publicId", auth, deletePetPhoto);

export default router