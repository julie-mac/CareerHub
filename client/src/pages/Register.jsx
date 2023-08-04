import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      console.log("New User:", data);
      
      //Clearing the form 
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <main className="register">
      <h1 className="registerTitle">Create an account</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
  
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
  
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
  
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <button className="registerBtn" type="submit">
          REGISTER
        </button>
        <p>
          Have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
