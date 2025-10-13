const nodemailer = require("nodemailer");

/**
 * sendEmail: sends an email or prints to console in dev
 * @param {Object} options - { email, subject, html }
 */
const sendEmail = async (options) => {
  // Development mode: just print to console
  if (process.env.NODE_ENV === "development") {
    console.log("💌 Email sending (dev mode) →", options);
    return;
  }

  // Production: actually send email
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // avoids self-signed certificate error
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;