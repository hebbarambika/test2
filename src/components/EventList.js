import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAdminContext } from "../context/AdminContext";
import "../css/EventList.css"; // Import CSS file for styling
import { useNavigate, Link } from "react-router-dom";

const EventListPage = () => {
	const { adminInfo } = useAdminContext();
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null); // State to track the selected event

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const response = await axios.get("http://localhost:3000/getevents", {
				params: {
					adminId: adminInfo.adminId,
					club: adminInfo.club,
				},
			});
			setEvents(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleMoreClick = (event) => {
		setSelectedEvent(event); // Set the selected event
	};

	return (
		<div className='Event-list-page'>
			<div className='event-list'>
				{/* <h2 className='event-list-title'>Event List</h2> */}
			<div className='auth-buttons1'>
					<h1 className="admin-text">Event List</h1>
					
					<div className="button-container">
						<Link to='/admin'>
						<button className='back-button' type='button'>
							Back to Admin
						</button>
						</Link>
						<Link to='/'>
						<button className='back-button' type='button'>
							Home
						</button>
						</Link>
					</div>
			</div>



				{events.map((eventCategory, index) => (
					<div key={index} className='event-category'>
						<h3 className='category-title'>{eventCategory._id}</h3>
						<ol>
							{eventCategory.events.map((event, index) => (
								<li className='event-item' key={index}>
									<span className='event-name'>{event.eventName}</span> -{" "}
									<span className='event-index'>{index + 1}</span>
									<button
										className='more-button'
										onClick={() => handleMoreClick(event)}
									>
										More
									</button>
								</li>
							))}
						</ol>
					</div>
				))}
			</div>
			{/* Conditional rendering to display event details */}

			{selectedEvent && (
				<div className='event-details'>
					<h3>Event Details</h3>
					<p>Event Name: {selectedEvent.eventName}</p>
					<p>Event Date: {selectedEvent.eventDate}</p>
					<p>Event Venue:{selectedEvent.eventVenue}</p>
					<p>Event Time:{selectedEvent.eventTime}</p>
					<p>enrollment LastDate:{selectedEvent.enrollmentLastDate}</p>
					{/* Add more details as needed */}
					<button onClick={() => setSelectedEvent(null)}>Close</button>{" "}
					{/* Close button to hide details */}
				</div>
			)}
			
		</div>
	);
};

export default EventListPage;
