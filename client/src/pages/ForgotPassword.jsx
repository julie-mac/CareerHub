import React, { useState } from "react";


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
    
    <form onSubmit={handleSubmit}>
    <label>
      Email:
      <input type="email" value={email} onChange={handleEmailChange} />
    </label>
    <div>
    <button type="submit">Request Reset</button>
    </div>
  </form>
</div>  
);

};


export default ForgotPasswordForm;