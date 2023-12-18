// File: App.js
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Map from './components/Map';
import './App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');


  const handleLogin = (enteredUsername) => {
    // Perform authentication logic (e.g., API request, validation)
    // For simplicity, just consider the user as authenticated if a username is entered
    if (enteredUsername) {
      setLoggedIn(true);
      setUsername(enteredUsername);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <div className='container'>
      {isLoggedIn ? (
        <Map username={username} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
