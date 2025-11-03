import express from "express";
import multer from "multer";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controller/postController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes
router.post("/create-post", requireSignIn, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/my-posts", requireSignIn, getMyPosts);
router.get("/:id", getPostById);
router.put("/:id", requireSignIn, upload.single("image"), updatePost);
router.delete("/:id", requireSignIn, deletePost);

export default router;
