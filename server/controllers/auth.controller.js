const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHanlder = require("../middleware/asyncHandler");
const User = require("../models/user.model");

const testRoute = async (req, res) => {
  return res.send("test route 2");
};

const register = asyncHanlder(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All details are required",
    });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: newPassword,
    });
    await newUser.save();
    const user_object = newUser.toObject();
    delete user_object.password;
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: user_object,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const login = asyncHanlder(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "All details are required",
    });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account does not exist",
      });
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Credentials",
      });
    }
    const token = jwt.sign(
      {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
      process.env.JWT_SECRET
    );
    const existingUser_object = existingUser.toObject();
    delete existingUser_object.password;

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Logged In successfully",
      token: token,
      user: existingUser_object,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout unsuccessful. Please try again later.",
    });
  }
};

module.exports = {
  testRoute,
  register,
  login,
  logout,
};
