// import React from 'react';
// import ClubInfoSlider from './ClubInfoSlider';
// import { useClubContext } from './context/ClubContext';
// import { ClubProvider } from './context/ClubContext';
import React from 'react';
import { useClubContext } from '../context/ClubContext';

const ClubPage = () => {
  // const { clubInfo, eventInfo } = useClubContext();
  const {clubInfo, eventInfo} = useClubContext();

  return (
    <div>
      <h1>{clubInfo.name}</h1>
      <p>{clubInfo.goal}</p>
      <img src={clubInfo.imgURL} alt={clubInfo.name} />
      <p>Admin: {clubInfo.adminName}</p>

      <h2>Events</h2>
      {eventInfo.map((event, index) => (
        <div key={index}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ClubPage;
