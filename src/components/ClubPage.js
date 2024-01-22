//ClubPage.js
import React from 'react';
import ClubInfoSlider from './ClubInfoSlider';

const ClubPage = () => {
  const clubInfo = {
    name: 'Example Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  };

  return (
    <div>
      <h1>Club Information Slider</h1>
      <ClubInfoSlider clubInfo={clubInfo} />
    </div>
  );
};

export default ClubPage;
