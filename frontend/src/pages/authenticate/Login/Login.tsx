import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../configurations/apiConfig";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Redirect after login

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isAuthenticated", "true"); // Store as a string

        navigate("/jobs"); // Redirect after login
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-sm p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          FREELANCE XONEE
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Username</label>
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-sm text-sm font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
