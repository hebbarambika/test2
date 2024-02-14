// src/App.js
import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Switch,
} from "react-router-dom";
import Button from "./components/Button";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import ClubPage from "./components/ClubPage";
import AddEventPage from "./components/AddEventPage";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";
import EventListPage from "./components/EventList";
import ViewMembers from "./components/ViewMembers";
import ForgotPassword from "./components/ForgotPassword";
import Enroll from "./components/Enroll";

const App = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

	const handleLogout = () => {
		setIsUserLoggedIn(false);
	};

	return (
		<Router>
			<Routes>
				<Route
					path='/login'
					element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />}
				/>
				<Route
					path='/Signup'
					element={<Signup setIsUserLoggedIn={setIsUserLoggedIn} />}
				/>
				<Route
					path='/clubpage'
					element={<ClubPage isAdminLoggedIn={isAdminLoggedIn} />}
				/>
				<Route path='/enroll' element={<ClubPage />} />
				<Route
					path='/'
					element={
						<HomePage
							isUserLoggedIn={isUserLoggedIn}
							setIsUserLoggedIn={setIsUserLoggedIn}
							isAdminLoggedIn={isAdminLoggedIn}
							setIsAdminLoggedIn={setIsAdminLoggedIn}
						/>
					}
				/>
				<Route path='/addevent' element={<AddEventPage />} />
				<Route path='/getevent' element={<EventListPage />} />
				<Route path='/viewmembers' element={<ViewMembers />} />
				<Route path='/admin' element={<AdminPage isUserLoggedIn={isUserLoggedIn}
							setIsUserLoggedIn={setIsUserLoggedIn}
							isAdminLoggedIn={isAdminLoggedIn}
							setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
				<Route path='/forgot' element={<ForgotPassword />} />
				<Route
					path='/adminlogin'
					element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
				/>
				<Route
					path='/buttons'
					element={
						<Button
							isUserLoggedIn={isUserLoggedIn}
							setIsUserLoggedIn={setIsUserLoggedIn}
							isAdminLoggedIn={isAdminLoggedIn}
							setIsAdminLoggedIn={setIsAdminLoggedIn}
						/>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
