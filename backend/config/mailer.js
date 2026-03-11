const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const sendContactEmail = async ({ name, email, subject, message }) => {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:monospace;background:#080c10;color:#e8f4f8;padding:32px;border:1px solid #1e2d3d;max-width:600px;">
        <div style="color:#00d4ff;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin-bottom:24px;">New Portfolio Contact</div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#5a7a8a;font-size:12px;width:80px;">From</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#5a7a8a;font-size:12px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00d4ff;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#5a7a8a;font-size:12px;">Subject</td><td style="padding:8px 0;">${subject}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #1e2d3d;margin:24px 0;"/>
        <div style="color:#5a7a8a;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Message</div>
        <div style="font-size:14px;line-height:1.8;color:#b0c8d4;">${message.replace(/\n/g, '<br/>')}</div>
        <hr style="border:none;border-top:1px solid #1e2d3d;margin:24px 0;"/>
        <div style="font-size:11px;color:#5a7a8a;">Sent from portfolio · ${new Date().toLocaleString()}</div>
      </div>
    `,
  })

  await transporter.sendMail({
    from: `"Jithnuka Athurugiriya" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Re: ${subject} — Got your message!`,
    html: `
      <div style="font-family:monospace;background:#080c10;color:#e8f4f8;padding:32px;border:1px solid #1e2d3d;max-width:600px;">
        <div style="color:#00d4ff;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin-bottom:20px;">Auto Reply</div>
        <p style="font-size:14px;line-height:1.8;margin-bottom:16px;">Hi ${name},</p>
        <p style="font-size:14px;line-height:1.8;margin-bottom:16px;color:#b0c8d4;">
          Thanks for reaching out! I've received your message and will get back to you as soon as possible — usually within 24 hours.
        </p>
        <p style="font-size:14px;line-height:1.8;margin-bottom:24px;color:#b0c8d4;">
          Best regards,<br/><strong style="color:#e8f4f8;">Jithnuka Athurugiriya</strong><br/>
          <span style="color:#5a7a8a;font-size:12px;">Operations Engineer · Omobio (Pvt) Ltd</span>
        </p>
        <hr style="border:none;border-top:1px solid #1e2d3d;"/>
        <p style="font-size:11px;color:#5a7a8a;margin-top:16px;">This is an automated reply.</p>
      </div>
    `,
  })
}

module.exports = { sendContactEmail, transporter }
