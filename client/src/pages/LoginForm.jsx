import React, { useState } from 'react';
import Navbar from "../layouts/Navbar";
import auth from '../utils/API';



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the utility function to make the authentication request
    auth.handleFormSubmit(username, password);
  };

  const handleForgotPasswordClick = () => {
    // Need "forgot password" functionality
    console.log('Forgot Password clicked');
  };

  const handleRegisterClick = () => {
    // needs to reroute user to a registration page
    console.log('Register clicked');
  };

  return (
  <div>
      <Navbar />
    <div>
        <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={handleForgotPasswordClick}>
            Forgot Password
          </button>
          <button type="button" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default LoginForm;