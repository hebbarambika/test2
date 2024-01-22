//ClubInfoSlider.js



import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ClubInfoSlider = ({ clubInfo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="club-info-slider">
      <Slider {...settings}>
        {clubInfo.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Club Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className="club-info">
        <h2>{clubInfo.name}</h2>
        <p>{clubInfo.description}</p>
        <p>Current Slide: {currentSlide + 1}</p>
      </div>
    </div>
  );
};

export default ClubInfoSlider;
