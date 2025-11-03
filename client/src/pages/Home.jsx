import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/api/v1/post");
        if (data.success) setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Loading spinner
  if (loading) {
    return (
      <Layout title="Home - Blog App">
        <div className="text-center py-10 text-gray-500">Loading posts...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Home - Blog App">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Latest Posts</h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all"
              >
                <figure>
                  <img
                    src={
                      post.imageURL
                        ? `http://localhost:5000${post.imageURL}`
                        : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={post.title}
                    className="h-56 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                    <span>By {post.username}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-primary btn-sm normal-case"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
