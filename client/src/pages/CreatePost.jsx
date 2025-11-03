import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [auth] = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple frontend validation
    if (title.trim().length < 5) {
      toast.error("Title must be at least 5 characters long");
      return;
    }

    if (content.trim().length < 50) {
      toast.error("Content must be at least 50 characters long");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await axios.post("/api/v1/post/create-post", formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Post created successfully");
        setTitle("");
        setContent("");
        setImage(null);
        setPreview(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating post");
    }
  };

  return (
    <Layout title="Create Post - Blog App">
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full mb-3"
            required
          />

          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full h-40 mb-3"
            required
          ></textarea>

          {/* Image upload */}
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Image preview */}
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Publish
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
