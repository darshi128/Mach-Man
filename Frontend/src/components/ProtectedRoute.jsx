import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          "http://localhost:3000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // While checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Checking authentication...</p>
      </div>
    );
  }

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in
  return children;
}

export default ProtectedRoute;