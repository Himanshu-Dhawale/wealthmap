export type CloudinaryUploadResponse = {
	secure_url: string;
	public_id: string;
	error?: { message: string };
};
