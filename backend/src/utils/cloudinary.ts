import { v2 as cloudinary } from 'cloudinary';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CLOUDINARY_CLOUD_NAME: string;
			CLOUDINARY_API_KEY: string;
			CLOUDINARY_API_SECRET: string;
		}
	}
}

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

export const uploadToCloudinary = async (file: string, folder = 'logos') => {
	return cloudinary.uploader.upload(file, {
		folder,
		resource_type: 'image',
	});
};
