import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Support both "Bearer <token>" and plain token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from DB to attach complete info (minus password)
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or no longer exists",
      });
    }

    req.user = user; // Attach full user object
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
