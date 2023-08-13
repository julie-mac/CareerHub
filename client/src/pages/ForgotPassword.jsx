import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState("enterEmail");
  const [error, setError] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/getPhoneNumber", {
        email: email,
      });

      setPhoneNumber(response.data.phoneNumber);
      setStep("enterVerificationCode");
      setError(null);
    } catch (error) {
      setError("Email not found.");
    }
  };

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/verify", {
        phone: phoneNumber,
        token: verificationCode,
      });

      if (response.data.valid) {
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
      const response = await axios.post("/api/reset", {
        phone: phoneNumber,
        token: verificationCode,
        newPassword: newPassword,
      });

      setStep("success");
      navigate('/');
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
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  } else if (step === "enterVerificationCode") {
    return (
      <div>
        <h2>A verification code has been sent to the phone number we have on file.</h2>
        <form onSubmit={handleVerificationCodeSubmit}>
          <label>
            Please enter the verification code:
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </label>
          <button type="submit">Verify Code</button>
        </form>
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
          <button type="submit">Reset Password</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  } else if (step === 'success') {
    return (
      <div>
        <h2>You've successfully reset your password and can log in. Redirecting you to the log-in pae in 3...2...1...</h2>
      </div>
    )
  }
}

export default ForgotPassword;

