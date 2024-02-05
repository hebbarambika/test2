// ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import "../css/ForgotPassword.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/forgot-password", {
        username,
      });

      if (response.data.status === "success") {
        setMessage("Password reset email sent. Check your email for instructions.");
      } else {
        setMessage("User not found. Please check your username.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="message">{message}</p>}
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;
