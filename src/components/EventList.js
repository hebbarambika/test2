//EventList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventListPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getevents'); // Assuming this endpoint exists
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoreClick = (eventId) => {
    // Handle displaying more details of the selected event (e.g., show a modal)
    console.log(`Show more details for event with ID: ${eventId}`);
  };

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.eventName} - {index + 1}
            <button onClick={() => handleMoreClick(event._id)}>More</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
