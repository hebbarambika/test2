import React, { useState } from "react";
import { useClubContext } from "../context/ClubContext";

const ClubPage = () => {
  const { clubInfo, eventInfo } = useClubContext();

  return (
    <div>
      <h1>{clubInfo.name}</h1>
      <p>{clubInfo.goal}</p>
      <img src={clubInfo.imgURL} alt={clubInfo.name} />
      {/* <p>Admin: {clubInfo.adminName}</p> */}

      <h2>Events</h2>
      {/* Iterate over events */}
      {eventInfo.map((event, index) => (
        <Event key={index} event={event} />
      ))}
    </div>
  );
};

const Event = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  const handleMoreClick = () => {
    setExpanded(!expanded);
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
          {/* You can display additional fields here */}
        </div>
      )}
      <button onClick={handleMoreClick}>{expanded ? "Less" : "More"}</button>
      <button>Enroll</button>
    </div>
  );
};

export default ClubPage;
