import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [useremail, setEmail] = useState("");

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("useremail");
    if (storedUserEmail) {
      setEmail(storedUserEmail);
    } else {
      console.error("User Email not found");
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://linkup-nd81.onrender.com/api/profile/${profileId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfile();
  }, [profileId]);

  const handleEmailSend = async () => {
    if (!profile?.email) return alert("Email address is not available!");

    setIsSending(true);
    try {
      const response = await axios.post("https://linkup-nd81.onrender.com/api/send-email", {
        to: profile.email,
        subject: "Someone viewed your profile!",
        message: `Hey ${profile.name},\n\n${useremail} just checked out your profile on LinkUp. Feel free to connect!\n\nCheers,\nLinkUp Team`,
      });

      if (response.status === 200) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    } finally {
      setIsSending(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900">
        <p className="text-lg font-medium text-slate-400 animate-pulse">
          Loading profile, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="w-full max-w-3xl bg-slate-700 shadow-lg rounded-xl p-6 sm:p-8 lg:p-10 text-slate-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 border-b border-slate-600 pb-6">
          <img
            src={profile.profilePic || "/default-avatar.jpg"}
            alt={`${profile.name}'s profile`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-600 shadow-md"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 md:mt-4">{profile.name}</h1>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              {profile.personality || "No personality info"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-300">Bio</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              {profile.bio || "No bio available"}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-300">Interests</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              {profile.interests?.length ? profile.interests.join(", ") : "No interests listed"}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-600 pt-4 text-center">
          <p className="text-sm text-slate-500">
            Profile last updated: {new Date(profile.updatedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleEmailSend}
            disabled={isSending}
            className={`px-4 py-2 rounded bg-slate-600 text-white hover:bg-slate-500 transition ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSending ? "Sending..." : "Notify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
