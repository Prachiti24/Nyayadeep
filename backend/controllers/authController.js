//email mis to be change from env while sending mail

const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const nodemailer = require("nodemailer");
const sendEmail = require("./../utils/email");
const {
  passwordResetEmail,
  otpVerificationEmail,
} = require("./../helpers/EmailTemplate");
const crypto = require("crypto");
const User = require("../models/User");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const createSendToken = (user, statusCode, req, res) => {
  const tokenData = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  user.password = undefined;

  res
    .status(statusCode)
    .cookie("token", token, { maxAge: 9000000, httpOnly: true, secure: true })
    .json({
      status: "success",
      token,
      data: {
        user,
      },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { username, name, email, password, passwordConfirm } = req.body;

  // Validate password confirmation
  if (password !== passwordConfirm) {
    return next(new AppError("Passwords do not match!", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError("Duplicate Email Found.", 401));
  }

  const Emailotp = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP

  // Hash the OTP
  const hashedOtp = crypto.createHash("sha256").update(Emailotp).digest("hex");

  const EmailotpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  const randomString = generateRandomString(6);
  const modifiedEmail = `notverified${randomString}${email}`;

  const newUser = await User.create({
    username,
    name,
    email: modifiedEmail,
    password,
    passwordConfirm,
    Emailotp: hashedOtp,
    EmailotpExpires,
  });

  // Send OTP via email
  const message = `Your OTP code is ${Emailotp}. It will expire in 10 minutes.`;
  console.log(message);

  try {
    await sendEmail({
      email,
      subject: 'Your OTP for Signup (valid for 10 min)',
      html: otpVerificationEmail(name, Emailotp)
    });
  } catch (err) {
    // Cleanup if email fails
    newUser.Emailotp = undefined;
    newUser.EmailotpExpires = undefined;
    await newUser.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }

  createSendToken(newUser, 200, req, res);
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  let token;

  // Get token from headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // Verify JWT
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // Hash incoming OTP
  const hashedOtp = crypto
    .createHash("sha256")
    .update(req.body.Emailotp)
    .digest("hex");

  // Extract the actual email (remove notverified prefix)
  const realEmail = decoded.email.slice(17);

  // Find matching user
  let user = await User.findOne({
    email: decoded.email,
    Emailotp: hashedOtp,
    EmailotpExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Invalid OTP or OTP expired. Please try again.", 401)
    );
  }

  // Update user email & clear OTP
  user.email = realEmail;
  user.Emailotp = undefined;
  user.EmailotpExpires = undefined;
  user = await user.save({ validateBeforeSave: false });

  // Return success
  createSendToken(user, 200, req, res);
});


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email) {
    return next(new AppError("Please provide email!", 400));
  }
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  var user;
  if (email) {
    user = await User.findOne({ email }).select("+password");
  }
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    maxAge: 9000,
    httpOnly: true,
  });
  res.status(200).clearCookie("token").json({ status: "success" });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  var user;
  if (req.body.email) {
    user = await User.findOne({ email: req.body.email });
  }
  if (!user) {
    user = await User.findOne({ mis: req.body.email });
  }
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }
  // console.log(user);

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  // console.log("Before saving:", user);
  await user.save({ validateBeforeSave: false });
  // console.log("After saving:", user);

  // await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  console.log(resetURL);
  try {
    // await sendEmail({
    //     email: user.email,
    //     subject: 'Your password reset token (valid for 10 min)',
    //     html: passwordResetEmail(user, resetURL)
    // });
    console.log("😒😒😒😒", resetToken);
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.getUserData = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  const user = req.user;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};


exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.verifiedUser = true;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // if (currentUser.verifiedUser !== true) {
  //     return next(new AppError('You are not verified user', 401));
  // }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  // console.log(req.user);
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_KEY
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};


