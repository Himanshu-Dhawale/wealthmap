import { Context } from 'hono';
import { CloudinaryUploadResponse } from '../types/cloudinary.types';

export const uploadToCloudinaryUnsigned = async (
	base64Image: string,
	c: Context,
	folder = 'logos',
	uploadPreset = 'wealthmap',
): Promise<{ success: true; secure_url: string; public_id: string }> => {
	const formData = new FormData();
	formData.append('file', base64Image);
	formData.append('upload_preset', uploadPreset);
	formData.append('folder', folder);

	const uploadUrl = `https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

	try {
		const response = await fetch(uploadUrl, {
			method: 'POST',
			body: formData,
		});

		const result = (await response.json()) as CloudinaryUploadResponse;

		if (!response.ok || !result.secure_url || !result.public_id) {
			console.error('Cloudinary upload failed:', result);
			throw new Error(result.error?.message || 'Upload failed');
		}

		return {
			success: true,
			secure_url: result.secure_url,
			public_id: result.public_id,
		};
	} catch (error) {
		console.error('Cloudinary fetch upload error:', error);
		throw new Error('Failed to upload image to Cloudinary');
	}
};
