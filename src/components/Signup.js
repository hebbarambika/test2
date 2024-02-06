//Signup.js

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import the UserContext
import "../css/Signup.css";
import i2 from "../assets/lavender.jpg";

function Login({ setIsUserLoggedIn }) {
	const history = useNavigate();
	const { login } = useContext(UserContext); // Access the login function from the context
	const [userType, setUserType] = useState("ug");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [course, setCourseName] = useState("");
	const [sem, setSem] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [clubName, setClubName] = useState("");
	const [password, setPassword] = useState("");
	const [yearPlaceholder, setYearPlaceholder] = useState("Year/Class");
	const [usernamePlaceholder, setUsernamePlaceholder] =
		useState("UG Register Number");

	// useEffect(() => {
	//     // If PG is selected, set club to M.Sc and disable the dropdown
	//     if (userType === "PG") {
	//     //   setClubName("M.Sc");
	//     //   setCourseName("M.Sc");
	//       setUsernamePlaceholder("PG Register Number");
	//     //   setYearPlaceholder("PG Year/Class");
	//     } else {
	//     //   setClubName("");
	//     //   setCourseName("");
	//       setUsernamePlaceholder("UG Register Number");
	//     //   setYearPlaceholder("UG Year/Class");
	//     }
	//   }, [userType]);

	async function submit(e) {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:3000/Signup", {
				userType,
				username,
				name,
				email,
				sem,
				contactNumber,
				clubName,
				course,
				password,
			});

			if (res.data === "exist") {
				alert("User already exists");
			} else if (res.data === "notexist") {
				alert("Signup successful");
				// Use the login function from the context to set the user as logged in
				login({
					username,
					userType,
					name,
					email,
					sem,
					contactNumber,
					clubName,
					course,
				});
				history("/");
			}
		} catch (e) {
			alert("Wrong details");
			console.log(e);
		}
	}

	const generateSemesterOptions = () => {
		const maxSemester = userType === "ug" ? 6 : 4;
		const options = [];
		for (let i = 1; i <= maxSemester; i++) {
			options.push(
				<option key={i} value={i}>
					{i}
				</option>
			);
		}
		return options;
	};

	// Helper function to generate club options based on user type
	const generateClubOptions = () => {
		const ugClubs = [
			"Arts Club",
			"NSS",
			"Red Cross",
			"IT Club",
			"Science Club",
			"Commerce Club",
			"NCC Navy",
			"NCC Army",
			"Eco Club",
			"RangerRovers",
		];
		const pgClubs = ["M.Sc"];
		const options = userType === "ug" ? ugClubs : pgClubs;
		return options.map((club) => (
			<option key={club} value={club}>
				{club}
			</option>
		));
	};
	const generateCourseOptions = () => {
		const ugCourse = ["BCOM", "BSC", "BCA", "BA"];
		const pgCourse = ["MSC"];
		const options = userType === "ug" ? ugCourse : pgCourse;
		return options.map((course) => (
			<option key={course} value={course}>
				{course}
			</option>
		));
	};

	return (
		<div className='signup-container'>
			<h1 className='signup-heading'>Signup Page</h1>
			<form action='POST' className='signup-form'>
				{/* Radio buttons for user type */}
				<div className='user-type'>
					<label className='user-type-label'>
						<input
							type='radio'
							value='ug'
							checked={userType === "ug"}
							onChange={() => {
								setUserType("ug");
								setUsernamePlaceholder("UG Register Number");
							}}
							className='user-type-input'
						/>
						UG
					</label>
					<label className='user-type-label'>
						<input
							type='radio'
							value='pg'
							checked={userType === "pg"}
							onChange={() => {
								setUserType("pg");
								setUsernamePlaceholder("PG Register Number");
							}}
							className='user-type-input'
						/>
						PG
					</label>
				</div>

				{/* Other input fields */}
				<div className='form-group'>
					<label className='form-label'>
						Username:
						<input
							type='text'
							value={username}
							placeholder={usernamePlaceholder}
							onChange={(e) => setUsername(e.target.value)}
							className='form-input'
						/>
					</label>
				</div>
				<div className='form-group'>
					<label className='form-label'>
						Name:
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='form-input'
						/>
					</label>
				</div>
				<div className='form-group'>
					<label className='form-label'>
						Email:
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='form-input'
						/>
					</label>
				</div>
				<div className='form-group'>
					<label className='form-label'>
						Semester:
						<select
							value={sem}
							onChange={(e) => setSem(e.target.value)}
							className='form-input'
						>
							<option value='' disabled hidden>
								Select Semester
							</option>
							{generateSemesterOptions()}
						</select>
					</label>
				</div>
				<div className='form-group'>
					<label className='form-label'>
						Contact Number:
						<input
							type='text'
							value={contactNumber}
							onChange={(e) => setContactNumber(e.target.value)}
							className='form-input'
						/>
					</label>
				</div>
				<div className='form-group'>
					<label className='form-label'>
						Club Name:
						<select
							value={clubName}
							onChange={(e) => setClubName(e.target.value)}
							className='form-input'
						>
							<option value='' disabled hidden>
								Select Club
							</option>
							{generateClubOptions()}
						</select>
					</label>
				</div>
				<div className='form-group'>
					<label className='form-label'>
						Course Name:
						<select
							value={course}
							onChange={(e) => setCourseName(e.target.value)}
							className='form-input'
						>
							<option value='' disabled hidden>
								Select Course
							</option>
							{generateCourseOptions()}
						</select>
					</label>
				</div>
				<div className='form-group'>
					<label className='form-label'>
						Password:
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='form-input'
						/>
					</label>
				</div>

				{/* Submit button */}
				<div className='form-group'>
					<button type='submit' className='submit-button' onClick={submit}>
						Submit
					</button>
				</div>
			</form>
			<p>OR</p>
			<br />
			<Link to='/login'>Login Page</Link>
			<br />
			{/* <Link to='/Forgot'>Forgot Password?</Link> */}
		</div>
	);
}

export default Login;
