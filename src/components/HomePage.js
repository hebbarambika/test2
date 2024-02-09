//HomePage.js
import React, { useState } from "react";
import { ClubProvider } from "../context/ClubContext";
import { useClubContext } from "../context/ClubContext";
import "../css/HomePage.css";
import i1 from "../assets/logo1.png";
import i2 from "../assets/am.jpeg";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import i3 from "../assets/lavender.jpg";
// import i4 from "../assets/b1.jpg";
// import i5 from "../assets/b2.jpg"

const HomePage = ({ isUserLoggedIn }) => {
	const collegeName = "Mahatma Gandhi Memorial College, Udupi. ";
	const collegeInfo =
		"Accredited by NAAC with 'A+' Grade (CGPA 3.36) in IVCycle of Accreditation";
	// const isUserLoggedIn = false;
	const history = useNavigate();
	const { setClubInfo, setEventInfo } = useClubContext();
	const [club, setClub] = useState(""); // State to hold the selected club name

	// Function to handle club link clicks and navigate to the login page
	// const handleClubClick = () => {
	//   history("/login")
	// };

	const handleClubClick = async (clubName) => {
		setClub(clubName);
		if (isUserLoggedIn) {
			try {
				const response = await axios.post("http://localhost:3000/clubpage", {
					club: clubName,
				});
				// Update the club and event details in the context
				setClubInfo(response.data.clubinfo);
				setEventInfo(response.data.event);
				// Navigate to the club page
				history(`/clubpage`);
			} catch (error) {
				console.error("Error:", error);
			}
		} else {
			history("/login"); // Navigate to the login page
		}
	};

	const handleLoginClick = () => {
		if (!isUserLoggedIn) {
			history("/login");
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

	return (
		<div>
			<div className='Headder'>
				<img className='l1' src={i1} alt='College Logo' />
				<div className='college-info-container'>
					<h1 className='college-name'>{collegeName}</h1>
					<p className='college-description'>{collegeInfo}</p>
				</div>
				<img className='l2' src={i2} alt='College Logo' />
			</div>
			{/* <div className='auth-buttons'>
            <button onClick={() => history("/login")}>Login</button>
            <button onClick={() => history("/Signup")}>Signup</button>
            <button onClick={() => history("/admin-login")}>Admin Login</button>
        </div> */}
			<div className='auth-buttons'>
				<h5>HOME</h5>
				<div className='button' onClick={handleLoginClick}>
					<h3>Login</h3>
				</div>
				<div className='button' onClick={handleSignupClick}>
					<h3>SignUp</h3>
				</div>
				<div className='button' onClick={() => history("/adminlogin")}>
					<h3>Admin Login</h3>
				</div>
			</div>
			{/* <h1>Hello {location.state.id} and welcome to the home</h1> */}
			<div className='image-container'>
				<div className='main-container'>
					{/* <div className='auth-buttons'>
            <button onClick={() => history("/login")}>Login</button>
            <button onClick={() => history("/Signup")}>Signup</button>
            <button onClick={() => history("/admin-login")}>Admin Login</button>
        </div> */}
					<div className='options-container'>
						{/* <div className='fixed-text'>
              <h3>CLUBS</h3>
          </div> */}
						<div className='club' onClick={() => handleClubClick("Arts Club")}>
							<div className='club-link'>
								<h3>Arts Club</h3>
							</div>
						</div>

						<div className='club' onClick={() => handleClubClick("NSS")}>
							<div className='club-link'>
								<h3>NSS</h3>
							</div>
						</div>

						<div className='club' onClick={() => handleClubClick("Red Cross")}>
							<div className='club-link'>
								<h3>Red Cross</h3>
							</div>
						</div>

						<div className='club' onClick={() => handleClubClick("IT Club")}>
							<div className='club-link'>
								<h3>IT Club</h3>
							</div>
						</div>

						<div
							className='club'
							onClick={() => handleClubClick("Science Club")}
						>
							<div className='club-link'>
								<h3>Science Club</h3>
							</div>
						</div>

						<div
							className='club'
							onClick={() => handleClubClick("Commerce Club")}
						>
							<div className='club-link'>
								<h3>Commerce Club</h3>
							</div>
						</div>

						<div className='club' onClick={() => handleClubClick("NCC Navy")}>
							<div className='club-link'>
								<h3>NCC Navy</h3>
							</div>
						</div>

						<div className='club' onClick={() => handleClubClick("NCC Army")}>
							<div className='club-link'>
								<h3>NCC Army</h3>
							</div>
						</div>

						<div className='club' onClick={() => handleClubClick("Eco Club")}>
							<div className='club-link'>
								<h3>Eco Club</h3>
							</div>
						</div>

						<div
							className='club'
							onClick={() => handleClubClick("RangerRovers")}
						>
							<div className='club-link'>
								<h3>RangerRovers</h3>
							</div>
						</div>

						<div className='club' onClick={() => handleClubClick("M.Sc")}>
							<div className='club-link'>
								<h3>M.Sc</h3>
							</div>
						</div>
					</div>
					<div className='additional-div'>
						<div className='comp1'>
							<h3>Attendence</h3>
						</div>
						<div className='comp2'>
							<h3>Certificate courses</h3>
						</div>
						<div className='comp3'>
							<h3>College Website</h3>
							<a
								href='https://www.mgmudupi.ac.in/'
								target='_blank'
								rel='noopener noreferrer'
							>
								Visit College website
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
