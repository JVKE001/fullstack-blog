import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  // Fetch user's posts
  const fetchMyPosts = async () => {
    try {
      const res = await axios.get("/api/v1/post/my-posts", {
        headers: { Authorization: auth?.token },
      });
      if (res.data.success) setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchMyPosts();
  }, [auth?.token]);

  // Delete post
  const handleDelete = async (postId) => {
    try {
      const res = await axios.delete(`/api/v1/post/${postId}`, {
        headers: { Authorization: auth?.token },
      });

      if (res.data.success) {
        setPosts(posts.filter((p) => p._id !== postId));
        toast.success("Post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  return (
    <Layout title="My Posts - Blog App">
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">My Posts</h1>

        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="card bg-base-100 shadow-md border hover:shadow-lg transition"
              >
                {post.imageURL && (
                  <figure className="h-56 overflow-hidden">
                    <img
                      src={`http://localhost:5000${post.imageURL}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                )}
                <div className="card-body">
                  <h2 className="card-title text-lg font-semibold text-gray-300">
                    {post.title}
                    <div className="badge badge-secondary">My Post</div>
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3">
                    {post.content}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-post/${post._id}`)}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="card-actions justify-end mt-3">
                    <div className="badge badge-outline">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-600">
            You haven’t created any posts yet.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyPosts;
