import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext"; // Import useUserContext instead of UserContext
import "../css/LoginPage.css";

const LoginPage = ({ setIsUserLoggedIn }) => {
	const { login } = useUserContext(); // Use useUserContext to access the login function
	const history = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function submit(e) {
		e.preventDefault();

		try {
			const res = await axios.post("http://localhost:3000/login", {
				username,
				password,
			});

			if (res.data.status === "match") {
				setIsUserLoggedIn(true);
				login(res.data.user); // Use the login function from the context
				alert("Login Successful");
				history("/", { state: { id: username } });
			} else if (res.data.status === "doesnotmatch") {
				alert("Enter correct Password");
			} else if (res.data.status === "notexist") {
				alert("User has not signed up");
			}
		} catch (error) {
			if (error.response) {
				if (error.response.status === 400) {
					alert("Enter correct Password");
				} else if (error.response.status === 404) {
					alert("User has not signed up");
				} else {
					alert("An error occurred. Please try again later.");
				}
			} else {
				alert("An error occurred. Please try again later.");
			}
			console.error(error);
		}
	}

	return (
		<div className='login-container'>
			<h3 className='login-text'>Login</h3>
			<form action='POST'>
				<div className='form-section'>
					<label htmlFor='username'>Username:</label>
					<br />
					<input
						type='username'
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Username'
					/>
				</div>

				<div className='form-section'>
					<label htmlFor='password'>Password :</label>
					<br />
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
					/>
				</div>

				<input className='submit-button1' type='submit' onClick={submit} />
			</form>

			<br />
			<p>Don't have an account?</p>
			<Link to='/Signup'>Signup Page</Link>
		</div>
	);
};

export default LoginPage;
