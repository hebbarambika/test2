import React, { useState, useContext } from "react";
import { useClubContext } from "../context/ClubContext";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

const ClubPage = () => {
  const { clubInfo, eventInfo } = useClubContext();

  // Filter events based on event type (Inter Club and Intra Club)
  const interClubEvents = eventInfo.filter(
    (event) => event.eventType === "Inter Club Event"
  );
  const intraClubEvents = eventInfo.filter(
    (event) => event.eventType === "Intra Club Event"
  );

  return (
    <div>
      <h1>{clubInfo.name}</h1>
      <p>{clubInfo.goal}</p>
      <img src={clubInfo.imgURL} alt={clubInfo.name} />

      <h2>Inter Club Events</h2>
      {interClubEvents.map((event, index) => (
        <Event key={index} event={event} />
      ))}

      <h2>Intra Club Events</h2>
      {intraClubEvents.map((event, index) => (
        <Event key={index} event={event} />
      ))}
    </div>
  );
};

const Event = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const { user } = useUserContext();
  const { clubInfo } = useClubContext();

  const handleMoreClick = () => {
    setExpanded(!expanded);
  };

  const handleEnrollClick = async (eventId, eventName, eventType) => {
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
    <div>
      <h3>{event.eventName}</h3>
      {expanded && (
        <div>
          <p>Date: {event.eventDate}</p>
          <p>Venue: {event.eventVenue}</p>
          <p>Time: {event.eventTime}</p>
          <p>Description: {event.eventDescription}</p>
        </div>
      )}
      <button onClick={handleMoreClick}>{expanded ? "Less" : "More"}</button>
      {!enrolled && (
        <button
          onClick={() =>
            handleEnrollClick(event._id, event.eventName, event.eventType)
          }
        >
          Enroll
        </button>
      )}
      {enrolled && <span>Enrolled</span>}
    </div>
  );
};

export default ClubPage;
