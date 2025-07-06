import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";
import petModel from "../models/petSchema.js";

// Cloudinary storage config
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const petId = req.params.id;
        let petName = "unnamed";

        if (petId) {
            const pet = await petModel.findById(petId);
            petName = pet?.name?.toLowerCase().replace(/\s+/g, "-") || "unnamed";
        }

        return {
            folder: `pets/${petName}-${petId}`,
            allowed_formats: ["jpg", "png", "jpeg", "webp", "heic", "avif"],
        };
    },
});

// Multer middleware config
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/avif",
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    },
});

// Use this for routes handling primary/secondary/tertiary fields
export const uploadPetImages = upload.fields([
    { name: "primary", maxCount: 1 },
    { name: "secondary", maxCount: 1 },
    { name: "tertiary", maxCount: 1 },
]);

export default upload;