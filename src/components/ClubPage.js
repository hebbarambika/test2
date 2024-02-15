import React, { useState } from "react";
import { useClubContext } from "../context/ClubContext";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import "../css/ClubPage.css";

const ClubPage = ({ isAdminLoggedIn }) => {
	const { clubInfo, eventInfo } = useClubContext();
	const { user } = useUserContext();

	// Filter events based on event type (Inter Club and Intra Club)
	const interClubEvents = eventInfo.filter(
		(event) => event.eventType === "Inter Club Event"
	);
	const intraClubEvents = eventInfo.filter(
		(event) => event.eventType === "Intra Club Event"
	);

	return (
		<div className='club-page'>
			<div className='club-info-container'>
				<div className='club-info'>
					<h1 className='club-name'>{clubInfo.name}</h1>
					<p className='club-goal'>{clubInfo.goal}</p>
					<img
						className='club-image'
						src={clubInfo.imgURL}
						alt={clubInfo.name}
					/>
				</div>

				<div className='event-container'>
					<h2 className='event-type-heading'>Inter Club Events</h2>
					{interClubEvents.map((event, index) => (
						<Event
							key={index}
							event={event}
							isAdminLoggedIn={isAdminLoggedIn}
						/>
					))}
				</div>

				<div className='event-container'>
					<h2 className='event-type-heading'>Intra Club Events</h2>
					{intraClubEvents.map((event, index) => (
						<Event
							key={index}
							event={event}
							isAdminLoggedIn={isAdminLoggedIn}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const Event = ({ event, isAdminLoggedIn }) => {
	const [expanded, setExpanded] = useState(false);
	const [enrolled, setEnrolled] = useState(false);
	const { user } = useUserContext();
	const { clubInfo } = useClubContext();

	const handleMoreClick = () => {
		setExpanded(!expanded);
	};

	const handleEnrollClick = async (eventId, eventName, eventType) => {
		if (isAdminLoggedIn) {
			alert("Admins cannot participate in these events.");
			return;
		}

		try {
			if (eventType === "Intra Club Event") {
				// Check if user belongs to the same club
				if (user.clubName !== clubInfo.name) {
					alert("You can only enroll in events of your own club.");
					return;
				}
			}

			const response = await axios.post("http://localhost:3000/enroll", {
				eventId: eventId,
				eventName: eventName,
				userId: user._id,
				username: user.username,
				club: clubInfo.name,
				eventType: eventType,
			});

			if (response.status === 200) {
				setEnrolled(true);
				alert("Participant added successfully");
			}
		} catch (error) {
			console.error("Error:", error);
			if (error.response && error.response.status === 400) {
				alert("User is already enrolled for this event");
			} else {
				alert("An error occurred while adding participant");
			}
		}
	};

	return (
		<div className='event'>
			<h3 className='event-name'>{event.eventName}</h3>
			{expanded && (
				<div className='event-details'>
					<p>Date: {event.eventDate}</p>
					<p>Venue: {event.eventVenue}</p>
					<p>Time: {event.eventTime}</p>
					<p className='event-description'>
						Description: {event.eventDescription}
					</p>
				</div>
			)}
			<button className='more-less-btn' onClick={handleMoreClick}>
				{expanded ? "Less" : "More"}
			</button>
			{!enrolled && !isAdminLoggedIn && (
				<button
					className='enroll-btn'
					onClick={() =>
						handleEnrollClick(event._id, event.eventName, event.eventType)
					}
				>
					Enroll
				</button>
			)}
			{enrolled && <span className='enrolled-tag'>Enrolled</span>}
		</div>
	);
};

export default ClubPage;
