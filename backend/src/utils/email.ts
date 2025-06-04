import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, html: string) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_APP_PASS,
		},
	});

	try {
		const info = await transporter.sendMail({
			from: `"WealthMap" <${process.env.GMAIL_USER}>`,
			to,
			subject,
			html,
		});
		console.info('Email sent:', info.messageId);
		return { success: true, message: 'Email sent successfully' };
	} catch (error) {
		console.error('Email sending error:', error);
		return { success: false, error, message: 'Failed to send email' };
	}
}
