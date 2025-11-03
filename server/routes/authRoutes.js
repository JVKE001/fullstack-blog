import express from "express";
import {
  registerController,
  loginController,
} from "../controller/authController.js";

import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// VERIFY USER (for frontend PrivateRoute)
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ success: true, ok: true });
});

export default router;
