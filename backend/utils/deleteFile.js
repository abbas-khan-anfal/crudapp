import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const deleteFileHandler = async (publicId) => {
    try {
        // Delete the file from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted file from Cloudinary: ${publicId}`, result);
    } catch (error) {
        console.error(`Failed to delete file from Cloudinary: ${publicId}`, error);
    }
};

export default deleteFileHandler;
