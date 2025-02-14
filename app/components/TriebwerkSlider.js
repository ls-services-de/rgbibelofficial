'use client';

import React, { useState } from "react";

const ImageSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // Start in der Mitte

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderPosition(value); // Update der Position, wenn der Slider bewegt wird
  };

  return (
    <div className="image-slider-container">
      <div className="image-wrapper">
        {/* Linkes Bild */}
        <img
          src="/sliderleft.png"
          alt="Left"
          className="left-image"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />
        {/* Rechtes Bild */}
        <img
          src="/sliderright.png"
          alt="Right"
          className="right-image"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />
        {/* Weiße Linie */}
        <div className="slider-line" style={{ left: `${sliderPosition}%` }}></div>
      </div>
      {/* Unsichtbares Eingabefeld für Slidersteuerung */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="slider-input"
      />
      
    </div>
  );
};

export default ImageSlider;
