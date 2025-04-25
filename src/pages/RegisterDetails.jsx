import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterDetails = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [interests, setInterests] = useState([]);
  const [personality, setPersonality] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    setInterests((prevInterests) => {
      if (prevInterests.includes(value)) {
        return prevInterests.filter((interest) => interest !== value);
      } else if (prevInterests.length < 4) {
        return [...prevInterests, value];
      }
      return prevInterests;
    });
  };

  const handlePersonalityChange = (e) => {
    setPersonality(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("personality", personality);
    data.append("interests", interests.join(","));
    data.append("bio", bio);
    if (profilePic) data.append("profilePic", profilePic);

    try {
      await axios.post("http://localhost:4000/createUser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen h-full w-full bg-slate-800 flex items-center justify-center py-12 px-6 font-mono">
      <section className="bg-slate-700 rounded-lg shadow-lg flex flex-col items-center max-w-lg w-full p-6 sm:p-10">
        <h1 className="text-2xl font-mono tracking-wider text-center bg-slate-700 text-gray-100 py-4 px-8">
          Create Your Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-8 w-full">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full bg-slate-600 text-gray-300 placeholder-gray-500 outline-none px-4 py-2 rounded-md focus:ring-2 focus:ring-slate-500 text-md font-mono"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full bg-slate-600 text-gray-300 placeholder-gray-500 outline-none px-4 py-2 rounded-md focus:ring-2 focus:ring-slate-500 text-md font-mono"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full bg-slate-600 text-gray-300 placeholder-gray-500 outline-none px-4 py-2 rounded-md focus:ring-2 focus:ring-slate-500 text-md font-mono"
            />
          </div>

          <div className="relative mt-6">
            <label className="block text-lg text-gray-100 mb-2 font-medium">Profile Picture</label>
            {profilePic && (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover mb-4 mx-auto border-4 border-slate-500 shadow-lg"
              />
            )}
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              autoComplete="off"
              className="block w-full text-sm text-gray-100 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-slate-500"
            />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-100 text-center mb-4">Your Interests</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Gaming",
                "Reading",
                "Programming",
                "Traveling",
                "Music",
                "Science",
                "Sports",
                "Art",
                "Cooking",
                "Fitness",
                "Photography",
                "Nature",
              ].map((interest, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={interest}
                    onChange={handleInterestChange}
                    checked={interests.includes(interest)}
                    disabled={interests.length >= 4 && !interests.includes(interest)}
                    className="accent-gray-600"
                  />
                  <span className="text-gray-100">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-100 text-center mb-4">Tell Us About Yourself</h2>
            <textarea
              className="w-full my-4 p-4 bg-slate-600 text-gray-300 placeholder-gray-500 outline-none px-4 py-2 rounded-md focus:ring-2 focus:ring-slate-500 text-md font-mono"
              placeholder="Enter a short bio"
              value={bio}
              onChange={handleBioChange}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-100 text-center mb-4">Choose Your Personality</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Analytical",
                "Creative",
                "Empathetic",
                "Extroverted",
                "Introverted",
                "Logical",
                "Flexible",
                "Independent",
                "Optimistic",
                "Patient",
                "Reliable",
                "Thoughtful",
              ].map((trait) => (
                <label key={trait} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="personality"
                    value={trait}
                    onChange={handlePersonalityChange}
                    className="accent-gray-600"
                  />
                  <span className="text-gray-100">{trait}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full bg-slate-500 text-gray-100 text-md font-mono py-2 rounded-md hover:bg-slate-600 transition-colors"
            >
              Register Now
            </button>
            {errorMessage && (
          <div className="text-red-500 text-center mt-4 p-2 border border-red-500 rounded-md bg-red-100">
            {errorMessage}
          </div>
        )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterDetails;
