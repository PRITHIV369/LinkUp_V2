// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Topmatches = () => {
//   const [matchedProfiles, setMatchedProfiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(
//     parseInt(localStorage.getItem("currentIndex")) || 0
//   );
//   const [userId, setUserId] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else {
//       console.error("User ID not found");
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const fetchProfiles = async () => {
//         try {
//           const response = await fetch("http://localhost:4000/api/top-profiles", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ userId }),
//           });
//           const data = await response.json();
//           console.log("Fetched Data:", data); 
//           const filteredProfiles = (data.topMatches?.matched_users || []).filter(
//             (profile) => profile.id !== userId
//           );

//           setMatchedProfiles(filteredProfiles);
//         } catch (error) {
//           console.error("Error fetching profiles:", error);
//         }
//       };
//       fetchProfiles();
//     }
//   }, [userId]);

//   const handleProfileClick = (name) => {
//     if (!name) {
//       console.error("Profile name is undefined");
//       return;
//     }
//     navigate(`/profile/${name}`);
//   };

//   const handleNext = () => {
//     if (matchedProfiles.length > 3) {
//       const newIndex = (currentIndex + 3) % matchedProfiles.length;
//       setCurrentIndex(newIndex);
//       localStorage.setItem("currentIndex", newIndex);
//     } else {
//       console.warn("Not enough profiles to paginate");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login"); 
//   };

//   const displayedProfiles = matchedProfiles.length > 3
//     ? [
//         ...matchedProfiles.slice(currentIndex, currentIndex + 3),
//         ...matchedProfiles.slice(0, Math.max(0, currentIndex + 3 - matchedProfiles.length)),
//       ]
//     : matchedProfiles;

//   return (
//     <div className="min-h-screen bg-slate-800 flex flex-col py-12 px-4 sm:px-6 font-mono relative">
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={handleLogout}
//           className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//       <div className="flex justify-center items-center h-full">
//         <div className="w-[90vw] sm:w-[80vw] md:w-[60vw] h-[80vh] bg-slate-800 shadow-lg rounded-xl p-6 sm:p-8 flex flex-col">
//           <div className="text-center mb-6">
//             <h1 className="text-2xl sm:text-3xl font-semibold text-slate-200">Top Matches</h1>
//             <p className="text-sm sm:text-md text-slate-400 mt-2 sm:mt-4">
//               Explore profiles that closely match your interests.
//             </p>
//           </div>
//           <div className="w-full h-[65%] bg-slate-700 rounded-lg p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
//             {matchedProfiles.length === 0 ? (
//               <div className="flex items-center justify-center h-full w-full">
//                 <div className="flex flex-col items-center justify-center md:pl-[35vw]">
//                   <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
//                   <p className="mt-4 text-slate-400 text-sm sm:text-md">Loading...</p>
//                 </div>
//               </div>
//             ) : (
//               displayedProfiles.map((profile, idx) => {
//                 return (
//                   <div
//                     key={idx}
//                     className="flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-md cursor-pointer rounded-md"
//                     onClick={() => handleProfileClick(profile.name)}
//                   >
//                     <img
//                       src={profile.profile_pic ? profile.profile_pic : "/default-avatar.jpg"}
//                       alt={`${profile.name}'s profile`}
//                       className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md"
//                     />
//                     <p className="mt-3 text-md sm:text-lg font-medium text-slate-200">
//                       {profile.name}
//                     </p>
//                   </div>
//                 );
//               })
//             )}
//             </div>
//           </div>
//           <div className="mt-4 flex justify-end">
//             <button
//               onClick={handleNext}
//               className="bg-slate-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-600 transition"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topmatches;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topmatches = () => {
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    parseInt(localStorage.getItem("currentIndex")) || 0
  );
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchProfiles = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/top-profiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          });
          const data = await response.json();
          console.log("Fetched Data:", data);
          const filteredProfiles = data.topMatches || [];

          setMatchedProfiles(filteredProfiles);
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      };
      fetchProfiles();
    }
  }, [userId]);

  const handleProfileClick = (_id) => {
    if (!_id) {
      console.error("Profile name is undefined");
      return;
    }
    navigate(`/profile/${_id}`);
  };

  const handleNext = () => {
    if (matchedProfiles.length > 3) {
      const newIndex = (currentIndex + 3) % matchedProfiles.length;
      setCurrentIndex(newIndex);
      localStorage.setItem("currentIndex", newIndex);
    } else {
      console.warn("Not enough profiles to paginate");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const displayedProfiles = matchedProfiles.length > 3
    ? [
        ...matchedProfiles.slice(currentIndex, currentIndex + 3),
        ...matchedProfiles.slice(0, Math.max(0, currentIndex + 3 - matchedProfiles.length)),
      ]
    : matchedProfiles;

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col py-12 px-4 sm:px-6 font-mono relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition"
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="w-[90vw] sm:w-[80vw] md:w-[60vw] h-[80vh] bg-slate-800 shadow-lg rounded-xl p-6 sm:p-8 flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-200">Top Matches</h1>
            <p className="text-sm sm:text-md text-slate-400 mt-2 sm:mt-4">
              Explore profiles that closely match your interests.
            </p>
          </div>
          <div className="w-full h-[65%] bg-slate-700 rounded-lg p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {matchedProfiles.length === 0 ? (
                <div className="flex items-center justify-center h-full w-full">
                  <div className="flex flex-col items-center justify-center md:pl-[35vw]">
                    <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-400 text-sm sm:text-md">Loading...</p>
                  </div>
                </div>
              ) : (
                displayedProfiles.map((profile, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-md cursor-pointer rounded-md"
                      onClick={() => handleProfileClick(profile._id)}
                    >
                      <img
                        src={profile.profilePic ? profile.profilePic : "/default-avatar.jpg"}
                        alt={`${profile.name}'s profile`}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md"
                      />
                      <p className="mt-3 text-md sm:text-lg font-medium text-slate-200 h-6 w-30 text-center">
                        {profile.name}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-slate-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-600 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topmatches;
