import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: `pets/${req.params.id || req.body.id || 'new'}`,
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: `${file.originalname.split('.')[0]}-${Date.now()}`,
    }),
});

const upload = multer({ storage });

export default upload;