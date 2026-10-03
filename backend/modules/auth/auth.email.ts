import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Email clients ignore <style> and modern CSS, so this is tables + inline styles on purpose
const verificationHtml = (firstName: string, link: string) => `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f1f5f9;">
  <div style="display:none;max-height:0;overflow:hidden;">Confirm your email to finish setting up TicketOS. The link expires in 1 hour.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,Helvetica,Arial,sans-serif;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td style="padding:0 4px 20px;">
          <span style="display:inline-block;width:28px;height:28px;border-radius:8px;background:#2563eb;color:#ffffff;font-size:15px;font-weight:700;line-height:28px;text-align:center;vertical-align:middle;">T</span>
          <span style="margin-left:8px;color:#0f172a;font-size:17px;font-weight:700;letter-spacing:-0.02em;vertical-align:middle;">TicketOS</span>
        </td></tr>
        <tr><td style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:40px 36px;">
          <h1 style="margin:0 0 12px;color:#0f172a;font-size:24px;font-weight:700;line-height:1.25;letter-spacing:-0.02em;">Confirm your email</h1>
          <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.6;">Hi ${escapeHtml(firstName)}, welcome to TicketOS. Confirm this is your email address and you're ready to plan your first sprint.</p>
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:10px;background:#2563eb;">
            <a href="${link}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:10px;">Verify email address</a>
          </td></tr></table>
          <p style="margin:28px 0 0;color:#64748b;font-size:13px;line-height:1.6;">This link expires in 1 hour. If the button doesn't work, paste this into your browser:</p>
          <p style="margin:6px 0 0;font-size:13px;line-height:1.5;word-break:break-all;"><a href="${link}" style="color:#2563eb;">${link}</a></p>
        </td></tr>
        <tr><td style="padding:24px 4px 0;color:#94a3b8;font-size:12px;line-height:1.6;">
          You're receiving this because someone signed up for TicketOS with this address. If it wasn't you, ignore this email and no account will be activated.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export const sendVerificationEmail = async (user: { id: string; email: string; firstName: string }) => {
  const token = jwt.sign({ sub: user.id }, process.env.EMAIL_VERIFY_SECRET!, { expiresIn: '1h' });
  const link = new URL(`/verify-email?token=${token}`, process.env.APP_URL).href;

  const { error } = await resend.emails.send({
    from: 'TicketOS <onboarding@resend.dev>',
    to: user.email,
    subject: 'Confirm your email for TicketOS',
    html: verificationHtml(user.firstName, link),
    // Plain-text part: some clients show only this, and spam filters score emails without one lower
    text: `Hi ${user.firstName}, confirm your TicketOS email: ${link}\n\nThis link expires in 1 hour. If you didn't sign up, ignore this email.`,
  });
  if (error) throw new Error(error.message);
};
