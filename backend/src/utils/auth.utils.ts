import { encodeBase64 } from 'hono/utils/encode';

export async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const passwordBuffer = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
	return encodeBase64(new Uint8Array(hashBuffer));
}
