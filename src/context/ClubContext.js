// ClubContext.js
import React, { createContext, useState, useContext } from 'react';

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [clubInfo, setClubInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);

  return (
    <ClubContext.Provider value={{ clubInfo, setClubInfo, eventInfo, setEventInfo }}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClubContext = () => useContext(ClubContext);
