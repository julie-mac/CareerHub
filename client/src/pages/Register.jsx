import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
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
      const response = await fetch("http://192.168.1.55:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration failed:', errorText);
        throw new Error('Registration failed');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log("New User Registered");
        history('/TopicsMain');
      }
      
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
  <div>
    <main  className="register">
      <h2>Create an account</h2>
      <form   onSubmit={handleSubmit}>
        <div>
          <label style={{ float: "left" }} >First Name: </label>
          <input className= "winput" 
            type="text"
            name="firstName"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div> 
        <label style={{ float: "left" }}>Last Name: </label>
        <input className= "winput"
          type="text"
          name="lastName"
          id="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>
        <div>
        <label style={{ float: "left" }} className="InputFont">Email Address: </label>
        <input className= "winput"
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div> 
        <label style={{ float: "left" }} htmlFor="phoneNumber">Phone Number: </label>
        <input className= "winput"
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        </div> 
        <div> 
        <label style={{ float: "left" }} htmlFor="password">Password: </label>
        <input className= "winput"
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div> 
        <div> 
        <button className="registerBtn" type="submit">
          REGISTER
        </button>
        </div> 
        <p>
          Have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </main>
  </div>
  );
};

export default Register;
