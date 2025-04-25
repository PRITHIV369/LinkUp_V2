import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-800 flex flex-col font-mono">
      <div className="w-full bg-slate-700 text-gray-100 py-4 px-8 shadow-md">
        <h1 className="text-2xl font-mono tracking-wider text-center">
          Welcome to <span className="text-slate-400">LinkUp</span>!
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow text-gray-100 text-center px-8">
        <h1 className="text-4xl font-bold mb-4">Connect. Collaborate. Create.</h1>
        <p className="text-md max-w-lg mb-8 leading-relaxed font-mono">
          LinkUp is the platform to connect with like-minded individuals, build meaningful
          relationships, and explore endless possibilities. Start growing your network today.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-3 text-md font-mono bg-slate-600 text-gray-100 rounded-md hover:bg-slate-500 shadow-md transition-colors"
        >
          Get Started
        </button>
      </div>
      <footer className="bg-slate-700 text-gray-300 py-4 text-center text-sm font-mono">
        <p>&copy; 2024 LinkUp. All Rights Reserved. | Built with 💙</p>
      </footer>
    </div>
  );
};

export default LandingPage;
