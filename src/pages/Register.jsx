import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  //handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try{
      console.log("Sending registration request...");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server Error:", errorData);
        throw new Error(`Registration failed: ${errorData}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      //handle user token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      //redirect to login page after successful registration
      setSuccess('User registered successfully! Redirecting to login page...');
      setTimeout(() => {
        navigate('/auth/login'); //redirect to login page after 2 seconds
      }, 2000); 

    } catch (error) {
      setError(error.message);
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
};

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          Sign Up
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
  },
  form: {
    display: 'inline-block',
    textAlign: 'left',
    maxWidth: '300px',
    width: '100%',
  },
  input: {
    display: 'block',
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#E9BA84',
    color: '#372D3D',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default RegisterPage;