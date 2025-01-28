import { useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'
import './App.css';


function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Hello component');
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};


export default App


