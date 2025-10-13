// emailTemplates.js

const getBaseStyles = () => `
    body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        -webkit-font-smoothing: antialiased;
    }
    .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
    }
    .welcome-header {
        background-color: #4052EC;
        padding: 20px;
        text-align: center;
        margin-bottom: 30px;
    }
    .content {
        padding: 30px;
        color: #424242;
    }
    .button {
        display: inline-block;
        padding: 12px 32px;
        background-color: #F15A2B;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        text-align: center;
    }
    .otp-container {
        text-align: center;
        margin: 30px 0;
        padding: 20px;
        border: 1px dashed #4052EC;
        border-radius: 8px;
    }
    .otp-text {
        font-size: 32px;
        font-weight: 500;
        color: #4052EC;
        letter-spacing: 8px;
        font-family: monospace;
    }
    .notes-container {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
    }
    .footer {
        margin-top: 20px;
    }
    .automated-message {
        text-align: center;
        color: #666666;
        font-size: 14px;
        padding: 15px 0;
        border-top: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
    }
    .copyright {
        text-align: center;
        background-color: #ffffff; 
        color: #000000;          
        padding: 12px;
        font-size: 14px;
    }

`;

const otpVerificationEmail = (name, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>${getBaseStyles()}</style>
    </head>
    <body>
        <div class="container">
            <div class="welcome-header">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">Welcome to Nyaydeep</h1>
            </div>
            <div class="content">
                <p style="font-size: 16px; margin-bottom: 20px;">Dear ${name},</p>
                <p style="font-size: 16px; margin-bottom: 30px;">Thank you for creating an account with Nyaydeep. Please use the verification code below to complete your registration:</p>
                <div class="otp-container">
                    <div class="otp-text">${otp}</div>
                </div>
                <div class="notes-container">
                    <p style="font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">Important Notes:</p>
                    <ul style="margin: 0; padding-left: 20px; color: #666666;">
                        <li style="margin-bottom: 8px;">This verification code expires in 10 minutes</li>
                        <li style="margin-bottom: 8px;">Never share this code with anyone</li>
                    </ul>
                </div>
                <p style="font-size: 16px; margin: 30px 0 0 0;">Thanks,<br>The Nyaydeep Team</p>
            </div>
            <div class="footer">
                <div class="automated-message">
                    This is an automated email. Please do not reply to this message.
                </div>
                <div class="copyright">
                    © ${new Date().getFullYear()} Nyaydeep. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};

const passwordResetEmail = (user, resetURL) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>${getBaseStyles()}</style>
    </head>
    <body>
        <div class="container">
            <div class="welcome-header">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">Reset Your Password</h1>
            </div>
            <div class="content">
                <p style="font-size: 16px; margin-bottom: 20px;">Dear ${user.name},</p>
                <p style="font-size: 16px; margin-bottom: 30px;">We received a request to reset your password. Please click the button below to create a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetURL}" class="button">Reset Password</a>
                </div>
                <div class="notes-container">
                    <p style="font-size: 14px; color: #666666; margin: 0;">
                        This link will expire in 30 minutes. If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                    </p>
                </div>
                <p style="font-size: 16px; margin: 30px 0 0 0;">Thanks,<br>The Nyaydeep Team</p>
            </div>
            <div class="footer">
                <div class="automated-message">
                    This is an automated email. Please do not reply to this message.
                </div>
                <div class="copyright">
                    © ${new Date().getFullYear()} Nyaydeep. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};

const dailyFactEmail = (user, fact) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Daily Fact</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #f4f4f7;
              color: #333333;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          .header {
              background-color: #4a90e2;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
          }
          .content {
              padding: 30px 20px;
              text-align: left;
          }
          .content p {
              font-size: 16px;
              line-height: 1.6;
              margin: 15px 0;
          }
          .fact-block {
              background-color: #f0f8ff;
              border-left: 4px solid #4a90e2;
              padding: 15px 20px;
              margin: 20px 0;
              border-radius: 4px;
              font-style: italic;
              font-size: 18px;
          }
          .source {
              font-size: 14px;
              color: #777777;
              margin-top: 10px;
          }
          .footer {
              background-color: #f4f4f7;
              color: #999999;
              text-align: center;
              font-size: 12px;
              padding: 15px 10px;
          }
          .footer a {
              color: #4a90e2;
              text-decoration: none;
          }
          @media (max-width: 600px) {
              .content {
                  padding: 20px 15px;
              }
              .header h1 {
                  font-size: 20px;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>📌 Your Daily Fact!</h1>
          </div>
          <div class="content">
              <p>Hi ${user.name},</p>
              <p>Here’s an interesting fact for you today:</p>
              <div class="fact-block">
                  ${fact.fact_text}
              </div>
              <div class="source">
                  Source: ${fact.source || 'Unknown'}
              </div>
              <p>Stay curious and enjoy your day! 🌟</p>
          </div>
          <div class="footer">
              This is an automated email from Nyaydeep. Please do not reply.<br/>
              © ${new Date().getFullYear()} Nyaydeep. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;
};


module.exports = { passwordResetEmail, otpVerificationEmail, dailyFactEmail };