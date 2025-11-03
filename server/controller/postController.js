import fs from "fs";
import path from "path";
import Post from "../model/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageURL = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" });
    }

    const post = new Post({
      title,
      content,
      imageURL,
      user: req.user._id,
      username: req.user.username,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching posts" });
  }
};

// Get Post by Logged-in User
export const getMyPosts = async (req, res) => {
  try {
    // req.user._id comes from the JWT decoded by requireSignIn middleware
    const userId = req.user._id;

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching your posts",
    });
  }
};
// Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error fetching single post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching post",
    });
  }
};

// Update Post Controller
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Ensure only creator can update
    if (post.username !== req.user.username) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update fields
    if (title) post.title = title;
    if (content) post.content = content;

    // Handle new image
    // Handle new image
    if (req.file) {
      if (post.imageURL) {
        const oldImagePath = path.join(process.cwd(), post.imageURL);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      post.imageURL = `/uploads/${req.file.filename}`;
    }

    await post.save();
    res.status(200).json({ success: true, message: "Post updated", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating post" });
  }
};

// Delete Post Controller
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.username !== req.user.username) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting post" });
  }
};
