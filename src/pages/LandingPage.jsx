import React from 'react';
import { Link } from 'react-router-dom';
import babyLogo from '../assets/babyLogo.png';

const LandingPage = () => {
  console.log('Rendering LandingPage');
  return (
    <div style={styles.container}>
      <img 
        src={babyLogo} 
        alt="BabyLog Logo" 
        style={styles.logo} 
        onError={(e) => e.target.style.display = 'none'} 
      />

      <h1>Welcome to BabyLog</h1>
      
      <div style={styles.linkContainer}>
        <Link to="/auth/register" style={styles.link}>
        Sign Up
        </Link>
        <Link to="/auth/login" style={styles.link}>
        Login
        </Link>
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
    backgroundColor: '#F6F5F3',
    color: '#E9BA84',
    borderRadius: '5px',
  },
  logo: {
    height: '300px',
    marginBottom: '30px',
  },
};

export default LandingPage;

