import express from "express";
import { createPet, listPet, listMyPets, readMyPet, patchPetImages, patchPet, deletePet, deletePetPhoto } from "../controllers/petController.js"
import { auth } from "../middlewares/authMiddleware.js"
import { uploadPetImages } from "../middlewares/upload.js";

const router = express.Router()

router.post("/", auth, createPet);
router.get("/", listPet);
router.get("/mine", auth, listMyPets);
router.get("/mine/:id", auth, readMyPet);
router.patch("/mine/:id/images", auth, uploadPetImages, patchPetImages); // this is for uploading images only
router.patch("/mine/:id", auth, uploadPetImages, patchPet); // this is for modifying data + image upload
router.delete("/mine/:id", auth, deletePet);
router.delete("/mine/:id/photos/:publicId", auth, deletePetPhoto);

export default router