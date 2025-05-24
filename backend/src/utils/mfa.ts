import { authenticator } from 'otplib';

export function generateMfaSecret(email: string) {
	const secret = authenticator.generateSecret();
	const otpauth = authenticator.keyuri(email, 'WealthMap', secret);
	return { secret, otpauth };
}

export function verifyMfaToken(secret: string, token: string) {
	return authenticator.verify({ token, secret });
}
