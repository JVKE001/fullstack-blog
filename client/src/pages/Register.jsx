import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/register", {
        username,
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message || "User registered successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const msg = error.response.data.message;
        if (msg.includes("Email")) {
          toast.error("This email is already registered");
        } else if (msg.includes("Username")) {
          toast.error("This username is already taken");
        } else {
          toast.error(msg);
        }
      } else {
        toast.error("Something went wrong during registration");
      }
      console.error(error);
    }
  };

  return (
    <Layout title="Register - Blog App">
      <form onSubmit={handleSubmit}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Create an Account</h1>
              <p className="py-6">
                Join the Blog App community and start sharing your thoughts with
                the world.
              </p>
            </div>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    className="input"
                    placeholder="Enter your name"
                    required
                  />

                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="input"
                    placeholder="Enter your email"
                    required
                  />

                  <label className="label">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    className="input"
                    placeholder="Create a password"
                    required
                  />

                  <button type="submit" className="btn btn-primary mt-4">
                    Register
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
