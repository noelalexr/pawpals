import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import petModel from '../models/petSchema.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const petId = req.params.id;
        const petName = req.body.name?.toLowerCase().replace(/\s+/g, '-') || 'unnamed';
        const pet = await petModel.findById(petId).select("images");

        // Determine which slots (1-3) are in use
        const usedNumbers = pet?.images?.map(img => {
            const match = img.public_id?.match(/-(\d+)$/);
            return match ? parseInt(match[1]) : null;
        }).filter(n => n !== null) || [];

        const availableSlot = [1, 2, 3].find(n => !usedNumbers.includes(n));

        return {
            folder: `pets/${petId}`,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp', `heic`, `avif`],
            public_id: `${petName}-${petId}-${availableSlot}`,
        };
    },
});

const upload = multer({ storage });

export default upload;