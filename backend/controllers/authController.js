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
const allowedKey = process.env.BACKEND_KEY;
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

if (!allowedKey) {
  console.error("Backend cannot start.");
  process.exit(1);
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
    //.cookie("token", token, { maxAge: 9000000, httpOnly: true, secure: true })
    .cookie("jwt", token, { maxAge:9000000, httpOnly:true, secure: process.env.NODE_ENV==="production"})
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
  if (password !== passwordConfirm) {
    return next(new AppError("Passwords do not match!", 400));
  }
  let existingUser = null;

  try {
    existingUser = await User.findOne({
      email: {
        $regex: `^(notverified.{6})?${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i",
      },
    });

    console.log("existingUser:", existingUser);

  } catch (err) {
    console.error("EMAIL CHECK ERROR:", err);

    return next(
      new AppError("Email validation failed", 500)
    );
  }

  if (existingUser) {
    return next(
      new AppError(
        "Email already exists or pending verification.",
        400
      )
    );
  }
  const Emailotp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = crypto.createHash("sha256").update(Emailotp).digest("hex");

  const EmailotpExpires = Date.now() + 10 * 60 * 1000;
  const randomString = generateRandomString(6);
  const modifiedEmail = `notverified${randomString}${email}`;

  console.log("Creating user...");
  const newUser = await User.create({
    username,
    name,
    email: modifiedEmail,
    password,
    passwordConfirm,
    Emailotp: hashedOtp,
    EmailotpExpires,
    verified: false,
  });
  console.log("User created:", newUser._id);

  const message = `Your OTP code is ${Emailotp}. It will expire in 10 minutes.`;
  console.log(message);

  try {
    console.log("Sending OTP...");
    const sent = await sendEmail({
    email,
    subject: "Your OTP for Signup (valid for 10 min)",
    html: otpVerificationEmail(name, Emailotp),
  });
    console.log("OTP SENT:", sent);
  if (!sent) {
    throw new Error("Email send failed");
  }
  } catch (err) {
  console.error("Signup email error:", err);

  // Delete the unverified user if email sending fails
  try {
   await User.findByIdAndDelete(newUser._id);
   console.log("Failed signup user removed");
} catch(e) {
   console.error("Delete failed", e);
}

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
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt || req.cookies.token) {
    token = req.cookies.jwt || req.cookies.token;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const hashedOtp = crypto
    .createHash("sha256")
    .update(req.body.Emailotp)
    .digest("hex");

  //const realEmail = decoded.email.slice(17);
  const realEmail = decoded.email.replace(/^notverified.{6}/,"");
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
  const duplicate = await User.findOne({
    email: realEmail,
    _id: { $ne: user._id },
  });

if (duplicate) {
  await User.findByIdAndDelete(user._id);

  return next(
    new AppError(
      "Email already verified with another account.",
      400
    )
  );
}
  user.email = realEmail;
  user.Emailotp = undefined;
  user.EmailotpExpires = undefined;
  user.verified = true;
  user = await user.save({ validateBeforeSave: false });
  createSendToken(user, 200, req, res);
});


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new AppError("Please provide email!", 400));
  }
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  var user;
  if (email) {
    user = await User.findOne({ email }).select("+password");
  }
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  if (!user.verified) {
    return next(new AppError("Please verify your email before logging in", 401));
  }
  createSendToken(user, 200, req, res);
});

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
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return next(new AppError("Passwords do not match", 400));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
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
  } else if (req.cookies.jwt || req.cookies.token) {
    token = req.cookies.jwt || req.cookies.token;
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
  if (req.cookies.jwt || req.cookies.token) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt || req.cookies.token,
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


exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const { name, username, email, telegramId } = req.body;
  const userId = req.user._id;
  if (email) {
    const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
    if (existingEmail) {
      return next(new AppError("Email is already in use", 400));
    }
  }

  if (username) {
    const existingUsername = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUsername) {
      return next(new AppError("Username is already in use", 400));
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, username, email, telegramId },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const Progress = require("../models/Progress");

exports.addXP = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { xp, activity = 'general' } = req.body; // XP amount and activity type

  if (!xp || isNaN(xp) || xp <= 0) {
    return next(new AppError("Invalid XP amount", 400));
  }

  // Update Progress model (primary XP tracking)
  let progress = await Progress.findOne({ userId });
  if (!progress) {
    progress = new Progress({ userId });
  }

  progress.xp += xp;

  // Check for badges based on XP milestones
  if (progress.xp >= 100 && !progress.badges.includes('First Steps')) {
    progress.badges.push('First Steps');
  }
  if (progress.xp >= 500 && !progress.badges.includes('Learner')) {
    progress.badges.push('Learner');
  }
  if (progress.xp >= 1000 && !progress.badges.includes('Scholar')) {
    progress.badges.push('Scholar');
  }

  // Update streak on activity
  const today = new Date();
  if (!progress.lastViewed || (today - new Date(progress.lastViewed)) / (1000 * 60 * 60 * 24) >= 1) {
    const diff = progress.lastViewed ? (today - new Date(progress.lastViewed)) / (1000 * 60 * 60 * 24) : 0;
    if (diff <= 2) {
      progress.streaks += 1;
    } else {
      progress.streaks = 1;
    }
    progress.lastViewed = today;
  }

  await progress.save();

  // Sync with User model for backward compatibility
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $inc: { xpTotal: xp }, lastAccessedAt: new Date() },
    { new: true, runValidators: false }
  );

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: `+${xp} XP added successfully from ${activity}!`,
    data: {
      user: updatedUser,
      progress: progress
    },
  });
});
