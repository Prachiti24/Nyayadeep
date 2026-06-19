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
// Debug Render env
console.log("EMAIL_USERNAME =", process.env.EMAIL_USERNAME);
console.log(
"EMAIL_PASSWORD exists =",
!!process.env.EMAIL_PASSWORD
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
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
console.log("Message ID:", info.messageId);

return true;

} catch (error) {
console.error("EMAIL ERROR:");
console.error(error);

return false;

}
};

module.exports = sendEmail;
