import React, { useState } from "react";
import NavBar from "../layouts/Navbar";

function ForgotPasswordForm({ onRequestReset }) {
    const [email, setEmail] = useState('');
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      onRequestReset(email);
    }; 
return (
<div>
    <NavBar />
    <form onSubmit={handleSubmit}>
    <label>
      Email:
      <input type="email" value={email} onChange={handleEmailChange} />
    </label>
    <button type="submit">Request Reset</button>
  </form>
</div>  
);

};




export default ForgotPasswordForm;