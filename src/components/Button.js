import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const history = useNavigate();

  const handleLoginClick = () => {
    if (!isUserLoggedIn && !isAdminLoggedIn) {
      history("/login");
    } else {
      alert("You are already logged in");
    }
  };

  const handleAdminLoginClick = () => {
    if (!isUserLoggedIn && !isAdminLoggedIn) {
      history("/adminlogin");
    } else {
      alert("You are already logged in");
    }
  };

  const handleSignupClick = () => {
    if (!isUserLoggedIn) {
      history("/Signup");
    } else {
      alert("You are already logged in");
    }
  };

  const handleLogoutClick = () => {
    // logout();
    history("/");
    setIsUserLoggedIn(false);
    setIsAdminLoggedIn(false);
  };

  return (
    <div>
      <div className="auth-buttons1">
        {(isUserLoggedIn || isAdminLoggedIn) && (
          <>
            <div className="button" onClick={handleLogoutClick}>
              <h3>Logout</h3>
            </div>
            <div className="button" onClick={() => history("/")}>
              <h3>Home</h3>
            </div>
          </>
        )}
        {!isUserLoggedIn && !isAdminLoggedIn && (
          <>
            <div className="button" onClick={handleLoginClick}>
              <h3>Login</h3>
            </div>
            <div className="button" onClick={handleSignupClick}>
              <h3>SignUp</h3>
            </div>
            <div className="button" onClick={handleAdminLoginClick}>
              <h3>Admin Login</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Button;
