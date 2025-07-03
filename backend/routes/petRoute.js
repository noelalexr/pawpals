import express from "express";
import {createPet, listPet, listMyPets, readPet, readMyPet, patchPet, deletePet, deletePetPhoto} from "../controllers/petController.js"
import {auth} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/upload.js";

const router = express.Router()

router.post("/", auth, upload.array("images", 3), createPet);
router.get("/", listPet);
router.get("/:id", readPet);
router.get("/mine", auth, listMyPets);
router.get("/mine/:id", auth, readMyPet);
router.patch("/mine/:id", auth, upload.array("images", 3), patchPet);
router.delete("/mine/:id", auth, deletePet);
router.delete("/mine/:id/photos/:publicId", auth, deletePetPhoto);

export default router