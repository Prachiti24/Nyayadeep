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
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },

      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    console.log("Connecting Brevo SMTP...");

    await transporter.verify();

    console.log("SMTP Connected ✅");

    const info = await transporter.sendMail({
      from: `"Nyayadeep" <prachititelsinge@gmail.com>`, // ← your VERIFIED sender
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    console.log("MAIL SENT ✅");
    console.log(info.messageId);

    return true;

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    return false;
  }
};

module.exports = sendEmail;