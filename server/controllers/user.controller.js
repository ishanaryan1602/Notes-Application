const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const testRoute = (req, res) => {
  res.send("user test route");
};

const getUserFromUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId }).populate("notes");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const user_object = user.toObject();
    delete user_object.password;
    return res.status(201).json({
      success: true,
      message: "user retreival successfull",
      user: user_object,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserFromUserId = async (req, res) => {
  const userId = req.params.id;
  const { email, username, password } = req.body;

  try {
    const updates = {};
    if (email) updates.email = email;
    if (username) updates.username = username;
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "User not found or no updates applied",
      });
    }

    const user_object = updatedUser.toObject();
    delete user_object.password;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: user_object,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUserFromUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Error deleting user",
      });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  testRoute,
  getUserFromUserId,
  updateUserFromUserId,
  deleteUserFromUserId,
};
