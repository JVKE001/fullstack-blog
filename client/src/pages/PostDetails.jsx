import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post by it's id
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/v1/post/${id}`);
        if (data.success) {
          setPost(data.post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // loading spinner
  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
          Loading post...
        </div>
      </Layout>
    );
  }

  // If no post found
  if (!post) {
    return (
      <Layout title="Post not found">
        <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
          Post not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={post.title}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50">
            {post.imageURL ? (
              <img
                src={`http://localhost:5000${post.imageURL}`}
                alt={post.title}
                className="w-full object-cover rounded-none md:rounded-l-2xl"
                style={{ maxHeight: "500px" }}
              />
            ) : (
              <div className="h-[300px] w-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-3 text-gray-900 leading-tight">
                {post.title}
              </h1>
              <div className="text-sm text-gray-500 mb-6">
                By{" "}
                <span className="font-medium text-gray-700">
                  {post.username}
                </span>{" "}
                • {new Date(post.createdAt).toLocaleString()}
              </div>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <Link
                to="/"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                ← Back to Home
              </Link>
              <button className="btn btn-outline btn-sm">Share Post</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetails;
