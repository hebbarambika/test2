// AddEventPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAdminContext } from "../context/AdminContext";
import "../css/AddEventPage.css";

function AddEventPage() {
	// Add useState for each form field
	const EventType = ["Inter Club Event", "Intra Club Event"];
	const history = useNavigate();
	const { adminInfo } = useAdminContext();
	const [eventType, setEventType] = useState("");
	// const [eventId, setEventId] = useState('');
	const [eventName, setEventName] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [eventVenue, setEventVenue] = useState("");
	const [eventTime, setEventTime] = useState("");
	const [enrollmentLastDate, setEnrollmentLastDate] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventRules, setEventRules] = useState("");
	const [createdBy, setCreatedBy] = useState(""); // Declare createdBy state
	const [club, setClub] = useState(""); // Declare club state
	//const { adminId, club } = adminInfo || {};

	useEffect(() => {
		if (adminInfo) {
			setCreatedBy(adminInfo.adminId);
			setClub(adminInfo.club);
		}
	}, [adminInfo]);

	async function eventSubmit(e) {
		e.preventDefault();
		try {
			await axios
				.post("http://localhost:3000/addevent", {
					eventType,
					eventName,
					eventDate,
					eventVenue,
					eventTime,
					enrollmentLastDate,
					eventDescription,
					eventRules,
					createdBy,
					club,
				})
				.then((res) => {
					if (res.data == "exist") {
						alert("Event already exists");
					} else if (res.data == "notexist") {
						// history("/home",{state:{id:email}})

						alert("Event added successfully");
						history("/admin");
					}
				})
				.catch((e) => {
					alert("wrong details");
					console.log(e);
				});
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (eventDate) {
			const formattedEventDate = new Date(eventDate)
				.toISOString()
				.split("T")[0];
			setEnrollmentLastDate("");
			document
				.getElementById("enrollmentLastDate")
				.setAttribute("max", formattedEventDate);
		}
	}, [eventDate]);

	return (
		<div className='addevent-container'>
			<h2 className='addevent-text'>Add Event</h2>
			<form action='POST' className='addevent-form'>
				<div className='form-content'>
					<label htmlFor='eventtype'>Event Type:</label>
					<div className='radio-group'>
						{EventType.map((event) => (
							<label key={event}>
								<input
									type='radio'
									value={event}
									onChange={() => setEventType(event)}
									checked={eventType === event}
									required
								/>
								{event}
							</label>
						))}
					</div>
				</div>

				<div className='form-content'>
					<label className='lbl' htmlFor='eventName'>
						Event Name:
					</label>
					<input
						className='input'
						type='text'
						name='eventName'
						id='eventName'
						onChange={(e) => setEventName(e.target.value)}
						required
					/>
				</div>

				<div className='form-content'>
					<label className='lbl' htmlFor='eventDate'>
						Date:
					</label>
					<input
						className='input'
						type='date'
						name='eventDate'
						id='eventDate'
						onChange={(e) => setEventDate(e.target.value)}
						required
					/>
				</div>

				<div className='form-content'>
					<label className='lbl' htmlFor='eventVenue'>
						Venue:
					</label>
					<input
						className='input'
						type='text'
						name='eventVenue'
						id='eventVenue'
						onChange={(e) => setEventVenue(e.target.value)}
						required
					/>
				</div>

				<div className='form-content'>
					<label className='lbl' htmlFor='eventTime'>
						Time:
					</label>
					<input
						className='input'
						type='time'
						name='eventTime'
						id='eventTime'
						onChange={(e) => setEventTime(e.target.value)}
						required
					/>
				</div>

				<div className='form-content'>
					<label className='lbl' htmlFor='enrollmentLastDate'>
						Enrollment Last Date:
					</label>
					<input
						className='input'
						type='date'
						name='enrollmentLastDate'
						id='enrollmentLastDate'
						onChange={(e) => setEnrollmentLastDate(e.target.value)}
						required
					/>
				</div>

				<div className='form-content'>
					<label className='lbl' htmlFor='eventDescription'>
						Event Description:
					</label>
					<textarea
						className='textarea'
						name='eventDescription'
						id='eventDescription'
						rows='4'
						cols='50'
						onChange={(e) => setEventDescription(e.target.value)}
						required
					></textarea>
				</div>

				<div className='form-content'>
					<label className='lbl' htmlFor='eventRules'>
						Event Rules:
					</label>
					<textarea
						className='textarea'
						name='eventRules'
						id='eventRules'
						rows='4'
						cols='50'
						onChange={(e) => setEventRules(e.target.value)}
						required
					></textarea>
				</div>

				<div className='form-content'>
					<button
						className='submit-button3'
						type='submit'
						onClick={eventSubmit}
					>
						Add Event
					</button>
				</div>
			</form>
			<Link to='/admin'>
				<button className='back-button' type='button'>
					Back to Admin
				</button>
			</Link>
		</div>
	);
}

export default AddEventPage;
