import { useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'
import UserDashboard from './pages/UserDashboard';
import './App.css';


function App() {
  
  useEffect(() => {
    console.log('Hello BabyLog');
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};


export default App


