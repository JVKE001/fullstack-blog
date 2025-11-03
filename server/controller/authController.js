import userModel from "../model/User.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

// REGISTER
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(422)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(422)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email is not registered" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = JWT.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};
