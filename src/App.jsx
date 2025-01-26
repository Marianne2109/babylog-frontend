import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import reactLogo from './assets/react.svg'
import './App.css';
import { useUserAuthContext} from './contexts/UserAuthContextProvider';

function App() {


  return (
    <div>
      BabyLog
    </div>

  )
}

export default App
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={babyLogo} className="logo" alt="BabyLog logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1> Welcome to BabyLog</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
 
