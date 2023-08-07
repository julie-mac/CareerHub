import React, { useState } from 'react';
import NavBar from "../layouts/Navbar";
import { useNavigate } from 'react-router-dom';
import auth from "../utils/API";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
  };

  const handleRegisterClick = () => {
    // Redirect the user to the registration page when "Register" is clicked
    console.log("Rerouting to register page...");
    history('/register');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the utility function to make the authentication request
    auth.handleFormSubmit(username, password);
  }
  return (
  <div>
      <NavBar />
    <div>
        <h2>Login</h2>
      <form  onSubmit={handleFormSubmit}>
        <div>
          <label  htmlFor="username">Username: </label>
          <input style={{ width: "200px" }}
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
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