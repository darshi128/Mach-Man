import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:3000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Logout failed. Please try again."
      );
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">

      {/* PAGE TITLE */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Machine Management System
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}
        <button className="relative text-xl text-slate-500 hover:text-blue-600 transition cursor-pointer">
          🔔

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* USER */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">
              {user?.name || "Loading..."}
            </p>

            <p className="text-xs text-slate-400">
              {user?.role || ""}
            </p>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="ml-3 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition cursor-pointer"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;