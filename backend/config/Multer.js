import multer from "multer";
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: 'crudAppImgs',
            allowedFormats: ['jpg', 'png', 'jpeg'],
            public_id: `${Math.random().toString().slice(2, 8)}-${file.originalname}` // Unique public ID
        }
    }
})


const fileUploader = multer({storage})
export default fileUploader
