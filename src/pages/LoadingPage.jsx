import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
      console.log("running");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-800 flex items-center justify-center">
      <div className="flex gap-3">
        <div className="w-4 h-4 bg-slate-500 rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-slate-400 rounded-full animate-bounce delay-150" />
        <div className="w-4 h-4 bg-slate-300 rounded-full animate-bounce delay-300" />
      </div>
    </div>
  );
};

export default LoadingPage;
