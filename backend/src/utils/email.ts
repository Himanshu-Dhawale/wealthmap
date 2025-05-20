import nodemailer from 'nodemailer';

export async function sendInvitationEmail(to: string, invitationLink: string) {
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
			subject: "You're invited to join the company on WealthMap!",
			html: `
		  <p>You've been invited to join WealthMap.</p>
		  <p>Click <a href="${invitationLink}">here</a> to accept the invitation.</p>
		`,
		});
		console.info('Email sent:', info.messageId);
		return { success: true, message: 'Invitation sent successfully!' };
	} catch (error) {
		console.error('Email sending error:', error);
		return { success: false, error, message: 'Failed to send email' };
	}
}
