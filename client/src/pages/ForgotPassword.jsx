import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("enterEmail");
  const [error, setError] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:3000/api/2fa/forgotpassword", {
            username: email,
        });

        if (response.data.userId) {
            setUserId(response.data.userId);
            setStep("enterVerificationCode");
            setError(null);
        } else {
            throw new Error(); // Trigger the catch block
        }
    } catch (error) {
        setError("Email not found.");
    }
};


  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/2fa/verifycode", {
        username: email,
        code: verificationCode,
      });

      if (response.data.message.includes("Code accepted")) {
        setStep("newPassword");
        setError(null);
      } else {
        setError("Invalid verification code.");
      }
    } catch (error) {
      setError("Failed to verify verification code.");
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.patch(`http://localhost:3000/api/users/${userId}`, {
            password: newPassword,
        });

        if (response.status === 200) {
            setStep("success");
            navigate('/');
        } else {
            setError("Failed to reset password.");
        }
    } catch (error) {
        setError("Failed to reset password.");
    }
};



  if (step === "enterEmail") {
    return (
      <div>
        <h2>Forgot Password</h2>
        <form onSubmit={handleEmailSubmit}>
          <label>
          Email: <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div>
          <button type="submit">Submit</button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  } else if (step === "enterVerificationCode") {
    return (
      <div>
        
        <form onSubmit={handleVerificationCodeSubmit}>
          <label style={{fontSize:"15px",  marginLeft:"0px"}}>
            Enter the Verification Code: <input style={{width:"250px", height:"8px", display:"inline-block",}}
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
           </label>
          <div>
          <button type="submit">Verify Code</button>
          </div>
        </form>
        <h2 style={{fontSize:"15px", color:"Chartreuse"}}>A verification code has been sent to the phone number we have on file.</h2>
        {error && <p>{error}</p>}
      </div>
    );
  } else if (step === "newPassword") {
    return (
      <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleNewPasswordSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <div>
          <button type="submit">Reset Password</button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  } else if (step === 'success') {
    return (
      <div>
        <h2 style={{fontSize:"15px", color:"Chartreuse"}}>You've successfully reset your password and can log in. Redirecting you to the log-in page in 3...2...1...</h2>
      </div>
    )
  }
}

export default ForgotPassword;
