import { v2 as cloudinary } from "cloudinary";

// configure cloudinary with credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

// Function to upload a file
export const uploadToCloudinary = async (filePath, folder = "audios") => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "video", // required for audio files
        folder,                 // optional folder to organize files
        overwrite: true
      });
      return result; // contains secure_url, public_id, etc.
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
};