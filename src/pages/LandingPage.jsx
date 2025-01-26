import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <Logo />
      <h1>Welcome to BabyLog</h1>
      
      <div style={styles.linkContainer}>
        <Link to="/signup" style={styles.link}>Sign Up</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  linkContainer: {
    marginTop: '20px',
  },
  link: {
    margin: '10px',
    padding: '10px 20px',
    textDecoration: 'none',
    backgroundColor: '#',
    color: '#',
    borderRadius: '5px',
  },
};

export default LandingPage;