// AdminPage.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/HomePage.css";
import { useNavigate} from "react-router-dom";

const Button = ({
	isUserLoggedIn,
	setIsUserLoggedIn,
	isAdminLoggedIn,
	setIsAdminLoggedIn,
}) => {
	const handleLoginClick = () => {
		if (!isUserLoggedIn && !isAdminLoggedIn) {
			history("/login");
		} else {
			alert("You are already logged in");
		}
	};
	// const handleLogoutClick = () => {
	// 	logout();

	// 	history("/");
	// 	setIsUserLoggedIn(false);
	// 	setIsAdminLoggedIn(false);
	// };

	const history = useNavigate();


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
			<div className='auth-buttons1'>
				<h1 className="admin-text">Admin</h1>
				
				<div className="button-container">
				{(isUserLoggedIn || isAdminLoggedIn) && (
					<div className='button' onClick={handleLogoutClick}>
						<h3>Logout</h3>
					</div>
				)}
				{!isUserLoggedIn && !isAdminLoggedIn && (
					<>
						<div className='button' onClick={handleLoginClick}>
							<h3>Login</h3>
						</div>
						<div className='button' onClick={handleSignupClick}>
							<h3>SignUp</h3>
						</div>
						<div className='button' onClick={handleAdminLoginClick}>
							<h3>Admin Login</h3>
						</div>
					</>
				)}
				</div>
			</div>
		</div>
	);
};

export default Button;
