import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import Layout from "../components/Layout/Layout";

const EditPost = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "", imageURL: "" });
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/v1/post/${id}`);
        if (res.data.success) {
          setPost(res.data.post);
        } else {
          toast.error("Failed to load post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Something went wrong while fetching post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle post update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      if (newImage) formData.append("image", newImage);

      const res = await axios.put(`/api/v1/post/${id}`, formData, {
        headers: {
          Authorization: auth?.token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Post updated successfully!");
        navigate("/");
      } else {
        toast.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error updating post");
    }
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg">
          Loading post...
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Post">
      <div className="max-w-3xl mx-auto mt-12 bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Your Post
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Post Title
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="Enter your post title..."
              className="w-full border text-gray-600 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Content
            </label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              placeholder="Write your post content..."
              className="w-full border text-gray-600 border-gray-300 rounded-lg px-4 py-2 h-40 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Featured Image
            </label>

            {/* Current Image */}
            {post.imageURL && !newImage && (
              <div className="mb-3">
                <img
                  src={`http://localhost:5000${post.imageURL}`}
                  alt="Current"
                  className="w-full max-h-64 object-cover rounded-lg shadow-sm border"
                />
              </div>
            )}

            {/* New Image Preview */}
            {newImage && (
              <div className="mb-3">
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg shadow-sm border"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;
