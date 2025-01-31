import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log({ email, password });

    try {
      const response = fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = response.json();
        console.error('Login Error:', errorText);
        throw new Error(errorData.message || 'Oops! Something went wrong. Please try again later.');
      }
      const data = response.json();
      console.log('Login Success:', data);

      //store token in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      //redirect to user dashboard after successful login
      navigate('/user');
    } catch (error) {
      setError(err.message);
      console.error('Login Error:', error);
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