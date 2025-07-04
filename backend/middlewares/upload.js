import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../configs/cloudinary.js"
import petModel from '../models/petSchema.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const petId = req.params.id;
        let petName = 'unnamed';
        let usedSlots = [];

        // If pet ID is provided, fetch pet data
        if (petId) {
            const pet = await petModel.findById(petId).select("images name");

            if (!pet) {
                throw new Error(`Pet with ID ${petId} not found.`);
            }

            petName = pet.name?.toLowerCase().replace(/\s+/g, '-') || 'unnamed';

            // Get used slot numbers (1, 2, 3)
            usedSlots = pet.images?.map(img => {
                const match = img.public_id?.match(/-(\d+)$/);
                return match ? parseInt(match[1], 10) : null;
            }).filter(n => n !== null) || [];
        }

        // Initialize available slot numbers if not already set
        if (!req.fileIndexMap) {
            const availableSlots = [1, 2, 3].filter(n => !usedSlots.includes(n));
            req.fileIndexMap = availableSlots;

            if (availableSlots.length === 0) {
                throw new Error('Maximum number of images reached for this pet');
            }
        }

        const nextSlot = req.fileIndexMap.shift();

        return {
            folder: `pets/${petName}-${petId}`,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'heic', 'avif'],
            public_id: `${petName}-${petId}-${nextSlot}`,
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/avif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Allowed types: JPEG, PNG, WEBP, HEIC, AVIF'));
        }
    },
});

export default upload;