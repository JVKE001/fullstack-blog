import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      // If backend sent specific messages
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          toast.error("Email is not registered");
        } else if (status === 401) {
          toast.error("Invalid password");
        } else if (status === 400) {
          toast.error("Please fill all fields");
        } else {
          toast.error(data.message || "Something went wrong");
        }
      } else {
        toast.error("Network error. Please try again.");
      }

      console.error(error);
    }
  };

  return (
    <Layout title="Login - Blog App">
      <form onSubmit={handleSubmit}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Welcome back to Blog App. Enter your credentials to continue.
              </p>
            </div>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="Email"
                    required
                  />

                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="Password"
                    required
                  />

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>

                  <button type="submit" className="btn btn-neutral mt-4">
                    Login
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

export default Login;
