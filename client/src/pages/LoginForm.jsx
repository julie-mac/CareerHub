import React, { useState } from 'react';
import NavBar from "../layouts/NavBar"


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
    //We can add logic here for authentication
    console.log('Username:', username);
    console.log('Password:', password);
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
      <NavBar />
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
        <div ga>
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

