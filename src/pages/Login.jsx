import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted!");
    setError(null);
    setLoading(true);


    try {
      const response = fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response received:", response);

      //check if response is valid json
      let data;
      try{
        data = await response.json();
      } catch (jsonError) {
        console.error("Response is not json:", jsonError);
        throw new Error("Unexpected response from server. Check backend.");
      }

      //check for errors in api
      if (!response.ok) {
        console.error('Login Error:', data);
        throw new Error(data.message || 'Oops! Something went wrong. Please try again later.');
      }

      console.log("Backend response:", data);

      // if (!response.ok) {
      //   const errorData = response.json();
      //   console.error('Login Error:', errorText);
      //   throw new Error(errorData.message || 'Oops! Something went wrong. Please try again later.');
      // }
   

      //store token in local storage for authentication
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log("User authenticated! Redirecting to user dashboard...");
      navigate("/user"); //redirect to user dashboard after successful login

    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Failed to connect to the server. Check your backend and try again later.");
    } finally {
      setLoading(false);
    }   
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};


const styles = {
  container: { textAlign: 'center', padding: '20px' },
  form: { display: 'inline-block', textAlign: 'left' },
  input: { 
    display: 'block', 
    margin: '10px 0', 
    padding: '10px', 
    width: '100%' 
  },
  button: { 
    padding: '10px 20px', 
    backgroundColor: '#E9BA84', 
    color: '#372D3D', 
    border: 'none', 
    borderRadius: '5px' 
  },
};

export default LoginPage;