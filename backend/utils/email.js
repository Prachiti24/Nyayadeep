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

      host: "smtp.brevo.com",   // ← CHANGE THIS

      port: 587,

      secure: false,



      auth: {

        user: process.env.EMAIL_USERNAME,

        pass: process.env.EMAIL_PASSWORD,

      },



      connectionTimeout: 10000,

      greetingTimeout: 10000,

      socketTimeout: 10000,

    });



    console.log("Connecting Brevo SMTP...");



   // await transporter.verify();



    console.log("SMTP Connected ✅");



    const info = await transporter.sendMail({

      from: `"Nyayadeep" <prachititelsinge@gmail.com>`,

      to: options.email,

      subject: options.subject,

      html: options.html,

    });



    console.log("MAIL SENT:", info.messageId);



    return true;



  } catch (error) {

    console.error("EMAIL ERROR:", error);

    return false;

  }

};



module.exports = sendEmail;