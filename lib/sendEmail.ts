const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
const FROM = process.env.EMAIL_FROM;

export default async function sendEmail(to: string, subject: string, text: string) {
  if (!SENDGRID_KEY || !FROM) {
    console.log('SendGrid not configured. Skipping email to', to);
    return;
  }

  try {
    const sgMail = await import('@sendgrid/mail');
    sgMail.default.setApiKey(SENDGRID_KEY as string);
    const msg = { to, from: FROM, subject, text } as any;
    await sgMail.default.send(msg);
  } catch (err) {
    console.error('Failed to send email (dynamic import)', err);
  }
}
