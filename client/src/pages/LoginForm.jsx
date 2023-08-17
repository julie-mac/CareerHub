import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../utils/API";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleForgotPasswordClick = () => {
    // Need "forgot password" functionality
    console.log('Forgot Password clicked');
    history("/ForgotPassword");
  };

  const handleRegisterClick = () => {
    // Redirect the user to the registration page when "Register" is clicked
    console.log("Rerouting to register page...");
    history('/register');
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await auth.handleFormSubmit(username, password);

      if (data.token) {
        localStorage.setItem('token', data.token);
        history('/TopicsMain');
      } else if (data.error) {
        setErrorMessage("Incorrect email or password. Please try again or register an account.")
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };
  
  return (
  <div>
    <div>
        <h2>Login</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form  onSubmit={handleFormSubmit}>
        <div>
          <label  htmlFor="username">Username: </label>
          <input style={{ width: "200px" }}
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label  htmlFor="password">Password: </label>
          <input style={{ width: "200px" }}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            autoComplete="current-password"
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