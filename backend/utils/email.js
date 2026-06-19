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
    console.log("EMAIL_USERNAME =", process.env.EMAIL_USERNAME);
    console.log(
      "EMAIL_PASSWORD exists =",
      !!process.env.EMAIL_PASSWORD
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },

      connectionTimeout: 120000,
      greetingTimeout: 120000,
      socketTimeout: 120000,
    });

    console.log("Connecting SMTP...");

    await transporter.verify();

    console.log("SMTP Connected ✅");

    const info = await transporter.sendMail({
      from: `"Nyayadeep" <${process.env.EMAIL_USERNAME}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    console.log("MAIL SENT ✅");
    console.log(info.response);

    return true;

  } catch (error) {
    console.error("EMAIL ERROR:");
    console.error(error);

    return false;
  }
};

module.exports = sendEmail;