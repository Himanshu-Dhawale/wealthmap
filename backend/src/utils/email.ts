import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvitationEmail(to: string, invitationLink: string) {
	try {
		const { data, error } = await resend.emails.send({
			from: 'himanshudhawale9@gmail.com',
			to,
			subject: "You're invited to join the company on WealthMap!",
			html: `
			  <p>You've been invited to join WealthMap.</p>
			  <p>Click <a href="${invitationLink}">here</a> to accept the invitation.</p>
			`,
		});

		if (error) {
			console.error('Email sending failed:', error);
			return { success: false, error, message: 'Email sending failed' };
		}
		return { success: true, data, message: 'Invitation sent successfully!' };
	} catch (err) {
		console.error('Email error:', err);
		return { success: false, error: err };
	}
}
