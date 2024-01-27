import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminContext } from '../context/AdminContext';
import '../css/EventList.css'; // Import CSS file for styling

const EventListPage = () => {
  const { adminInfo } = useAdminContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getevents', {
        params: {
          adminId: adminInfo.adminId,
          club: adminInfo.club
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoreClick = (eventId) => {
    console.log(`Show more details for event with ID: ${eventId}`);
    // You can add logic here to display more details, e.g., open a modal
  };

  return (
    <div>
      <h2 className='event-list-title'>Event List</h2>
      {events.map((eventCategory, index) => (
        <div key={index} className='event-category'>
          <h3 className='category-title'>{eventCategory._id}</h3>
          <ol>
            {eventCategory.events.map((event, index) => (
              <li className='event-item' key={index}>
                <span className='event-name'>{event.eventName}</span> - <span className='event-index'>{index + 1}</span>
                <button className='more-button' onClick={() => handleMoreClick(event._id)}>More</button>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default EventListPage;
