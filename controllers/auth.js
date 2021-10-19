const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed tokens
const expressjwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    // Make salt and hashed password invisible in json response
    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // find user by email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ err: "Invalid username or password" });
    }
    // if found user, check username and password
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // generate signed token with userid and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // give name "T" to token in cookie for expiry date
    res.cookie("T", token, { expire: new Date() + 9999 });
    // return res with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Sign out successful" });
};

exports.requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Administrative access denied",
    });
  }
  next();
};
