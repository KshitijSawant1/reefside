import React, { useState } from 'react';
import './Login.css';
import ReefSideLogo from '/Users/kshitijksawant/Programs/Reefside-Restro-React/reefside/src/components/ReefSideTitle.png'; // Adjust the path to your image

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'UserA' && password === 'Waiter') {
      window.location.href = '/app'; // Redirect to main page for UserA
    } else if (username === 'Admin' && password === 'Manager') {
      window.location.href = '/admin'; // Redirect to admin page for Admin
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      {/* Add the logo image above the login box */}
      <img src={ReefSideLogo} alt="ReefSide Logo" className="logo" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
