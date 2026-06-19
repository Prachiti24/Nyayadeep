/*const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const receiver = {
    from: "sreya2407@gmail.com",
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  auth.sendMail(receiver, (error, emailResponse) => {
    if (error)
      throw error;
    console.log("success!");
    response.end();
  });
};

module.exports = sendEmail;*/

const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",   // ← change this
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },

      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    console.log("Connecting SMTP...");

    await transporter.verify();

    console.log("SMTP connected ✅");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    console.log("OTP email sent:", info.messageId);

    return true;

  } catch (err) {
    console.error("Email failed:");
    console.error(err);

    return false;
  }
};

module.exports = sendEmail;