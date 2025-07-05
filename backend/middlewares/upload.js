import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../configs/cloudinary.js"
import petModel from '../models/petSchema.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const petId = req.params.id;
        let petName = 'unnamed';
        const usedSlots = new Set();

        if (petId) {
            const pet = await petModel.findById(petId).select("images name");

            if (!pet) {
                throw new Error(`Pet with ID ${petId} not found.`);
            }

            petName = pet.name?.toLowerCase().replace(/\s+/g, '-') || 'unnamed';

            if (pet.images?.primary?.public_id) {
                const match = pet.images.primary.public_id.match(/-(\d+)$/);
                if (match) usedSlots.add(parseInt(match[1], 10));
            }

            if (pet.images?.secondary?.length) {
                for (const img of pet.images.secondary) {
                    const match = img.public_id.match(/-(\d+)$/);
                    if (match) usedSlots.add(parseInt(match[1], 10));
                }
            }
        }

        if (!req.fileIndexMap) {
            req.fileIndexMap = [1, 2, 3]; // primary, secondary1, secondary2
        }

        // Assign next available slot or reuse slot to allow overwrite
        const slot = req.fileIndexMap.shift();
        return {
            folder: `pets/${petName}-${petId}`,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'heic', 'avif'],
            public_id: `${petName}-${petId}-${slot}`,
        };
    }
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