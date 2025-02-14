"use client"
import React, { useEffect, useState } from 'react';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          return 0;
        }
        return prevProgress + 0.1; // Adjust the increment to fill in 5 seconds
      });
    }, 5); // Update progress every 5ms

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute bottom-[40px] sm:bottom-[80px] left-1/2 transform -translate-x-1/2 text-center text-white">
            <h1 className="text-[32px] sm:text-[64px] font-spartan tracking-[10px] sm:tracking-[25px] uppercase">{image.title}</h1>
            <p className="text-[16px] sm:text-[30px] font-spartan uppercase text-[#e4e4e4] mt-[-10px] sm:mt-[-15px]">{image.caption}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 w-1/2 sm:w-1/4 h-1 bg-white">
        <div
          className="bg-[#04cefe] h-full"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        ></div>
      </div>
    </div>
  );
};

export default Slider;
