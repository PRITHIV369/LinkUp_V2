import React from 'react';
import './assets/css/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topmatches from './pages/Topmatches';
import RegisterDetails from './pages/RegisterDetails';
import Login from './pages/Login';
import ProfileDetails from './pages/ProfileDetails';
import LoadingPage from './pages/LoadingPage';
import LandingPage from './pages/LandingPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage/>} />
        <Route path="/home" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterDetails/>} />
        <Route path="/topmatches" element={<Topmatches/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile/:profileId" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
