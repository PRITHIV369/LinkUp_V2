import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://linkup-nd81.onrender.com/login", formData);
      const { userId,useremail } = response.data;
      localStorage.setItem("userId", userId);
      localStorage.setItem("useremail",useremail);
      navigate("/topmatches");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Incorrect email or password");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-800 flex items-center justify-center">
      <div className="md:h-[60%] md:w-[25%] w-[90%] h-[50%] bg-slate-700 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-full h-[15%] bg-slate-600 rounded-t-lg flex justify-center items-center text-gray-100 text-md font-mono">
          LOGIN
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center text-sm font-mono mt-2">
            {errorMessage}
          </div>
        )}
        <form
          onSubmit={handleLogin}
          className="w-[90%] flex flex-col md:gap-6 gap-10 mt-8"
        >
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-slate-600 text-gray-300 placeholder-gray-500 outline-none px-4 py-2 rounded-md focus:ring-2 focus:ring-slate-500 text-md font-mono"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-slate-600 text-gray-300 placeholder-gray-500 outline-none px-4 py-2 rounded-md focus:ring-2 focus:ring-slate-500 text-md font-mono"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-slate-500 text-gray-100 text-md font-mono py-2 rounded-md hover:bg-slate-600 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="w-[100%] flex items-center justify-center text-sm font-mono text-gray-100 md:mt-5 mt-8">
          Don't have an account?{" "}
          <a href="/register" className="ml-1 text-slate-400 hover:underline">
            Create one
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
