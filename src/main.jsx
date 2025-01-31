import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { UserAuthContextProvider } from './contexts/UserAuthContext';
import { ChildContextProvider } from './contexts/ChildContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <UserAuthContextProvider>
      <ChildContextProvider>      
        <App />
      </ChildContextProvider>
    </UserAuthContextProvider>
   </BrowserRouter>
  </StrictMode>
);
