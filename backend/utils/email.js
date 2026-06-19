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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("OTP email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Email failed:");
    console.error(error);
    return false;
  }
};

module.exports = sendEmail;