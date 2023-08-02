import React, { useState } from 'react';
import NavBar from "../layouts/Navbar";
import handleFormSubmit from "../utils/API";


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
        <form onSubmit={() => handleFormSubmit(email, password)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
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

