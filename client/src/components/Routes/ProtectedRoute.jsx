import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setOk(res.data.ok);
      } catch (error) {
        console.error("Auth verification failed:", error);
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) checkAuth();
    else {
      setOk(false);
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Checking authentication...
      </div>
    );
  }

  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
