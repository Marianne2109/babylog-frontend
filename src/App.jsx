import { useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'
import UserDashboard from './pages/UserDashboard';
import NewChildProfile from './pages/NewChildProfile';
import './App.css';


function App() {
  
  useEffect(() => {
    console.log('Hello BabyLog');
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/child" element={<NewChildProfile />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};


export default App


