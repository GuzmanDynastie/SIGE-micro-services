import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config()

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        // Carpetas donde se guardaran las imagenes
        folder: 'uploads',
        format: async (req, file) => {
            const allowedFormats = ['jpg', 'jpeg', 'png', 'webp'];
            const ext = file.mimetype.split('/')[1];
            return allowedFormats.includes(ext) ? ext : 'png'; // Si el formato no es permitido, lo convierte a 'png'
        },
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});

const upload = multer({ storage });

export { cloudinary, upload };