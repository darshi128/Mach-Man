import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Operator",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/login",
          { email: formData.email, password: formData.password },
          { withCredentials: true },
        );
        console.log(response.data);
        navigate("/dashboard");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/register",
          formData,
          { withCredentials: true },
        );
        console.log(response.data);
        alert("Registration successful!");
        setIsLogin(true);
        setFormData({
          name: "",
          email: formData.email,
          password: "",
          role: "Operator",
        });
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;
      if (message) {
        alert(message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      {" "}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {" "}
        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-slate-800 text-white p-12 flex-col justify-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
              {" "}
              MMS{" "}
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {" "}
              Machine Management System{" "}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              {" "}
              Manage machines, operators and maintenance efficiently from one
              centralized system.{" "}
            </p>
          </div>
          <div className="space-y-4 text-slate-300">
            <p>✓ Machine Tracking</p>
            <p>✓ Operator Management</p>
            <p>✓ Maintenance Monitoring</p>
            <p>✓ Role Based Access</p>
          </div>
        </div>{" "}
        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {" "}
          {/* TABS */}
          <div className="flex border-b border-slate-200 mb-8">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setShowPassword(false);
              }}
              className={`w-1/2 pb-3 font-semibold transition-all duration-200 cursor-pointer ${isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              {" "}
              Login{" "}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setShowPassword(false);
              }}
              className={`w-1/2 pb-3 font-semibold transition-all duration-200 cursor-pointer ${!isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              {" "}
              Register{" "}
            </button>
          </div>{" "}
          {/* HEADING */}
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {" "}
            {isLogin ? "Welcome Back!" : "Create Account"}{" "}
          </h2>
          <p className="text-slate-500 mb-8">
            {" "}
            {isLogin
              ? "Login to access your MMS dashboard."
              : "Create your account to get started."}{" "}
          </p>{" "}
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {" "}
            {!isLogin && (
              <>
                {" "}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {" "}
                    Name{" "}
                  </label>{" "}
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {" "}
                    Role{" "}
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
                  >
                    {" "}
                    <option value="Admin">Admin</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Operator">Operator</option>
                  </select>{" "}
                </div>{" "}
              </>
            )}{" "}
            {/* EMAIL */}{" "}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>{" "}
            {/* PASSWORD */}{" "}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {" "}
                Password{" "}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {" "}
                  {showPassword ? "🙈" : "👁️"}{" "}
                </button>{" "}
              </div>
            </div>{" "}
            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-3 rounded-lg transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {" "}
              {isLoading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Register"}{" "}
            </button>
          </form>{" "}
          {/* SWITCH */}
          <p className="text-center text-sm text-slate-500 mt-6">
            {" "}
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setShowPassword(false);
              }}
              className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
            >
              {" "}
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;