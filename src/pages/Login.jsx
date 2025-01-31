import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  export default function Login() => {
    let navigate = useNavigate();

    const handleLogin = () => {
      navigate('/dashboard');
    }
  }
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', padding: '20px' },
  form: { display: 'inline-block', textAlign: 'left' },
  input: { display: 'block', margin: '10px 0', padding: '10px', width: '100%' },
  button: { padding: '10px 20px', backgroundColor: '#E9BA84', color: '#372D3D', border: 'none', borderRadius: '5px' },
};

export default LoginPage;