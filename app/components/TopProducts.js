"use client"

import React, { useState } from 'react';




const TopProducts = ({producttop}) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? producttop.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === producttop.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { title, specs, image, link } = producttop[currentProductIndex];

  return React.createElement(
    'div',
    { className: 'flex flex-col items-center justify-center min-h-screen text-white p-4 mt-10' },
    React.createElement('h2', { className: 'text-4xl font-bold text-white mb-12' }, 'Top Products'),
    React.createElement(
      'div',
      { className: 'relative flex items-center justify-center w-full max-w-5xl' },
      React.createElement('img', {
        src: '/assets/leftarrow.png',
        alt: 'Previous',
        className: 'absolute left-0 cursor-pointer w-10 h-10',
        onClick: handlePrevClick
      }),
      React.createElement(
        'div',
        {
          className: 'relative flex flex-col md:flex-row items-center justify-center w-full bg-cover p-4 rounded-lg',
          style: { backgroundImage: `url(/assets/tp-bg.png)` }
        },
        React.createElement('img', {
          src: image,
          alt: title,
          className: 'w-auto md:w-1/2 h-auto max-h-[400px] object-contain mb-4 md:mb-0 md:mr-4'
        }),
        React.createElement(
          'div',
          { className: 'flex flex-col justify-between text-white w-full md:w-1/2' },
          React.createElement('h3', { className: 'text-3xl font-bold text-cyan-500 mb-4' }, title),
          React.createElement(
            'ul',
            { className: 'list-disc list-inside mb-4 md:text-white text-black font-medium' },
            specs.map((spec, index) =>
              React.createElement('li', { key: index, className: 'text-lg' }, spec)
            )
          ),
          React.createElement(
            'a',
            {
              href: link,
              className: 'self-end mt-4 md:translate-y-[80px] md:mr-[40px] md:mt-0 px-4 py-2 bg-cyan-500 text-white font-bold rounded hover:bg-cyan-600'
            },
            'Zum Shop'
          )
        )
      ),
      React.createElement('img', {
        src: '/assets/rightarrow.png',
        alt: 'Next',
        className: 'absolute right-0 cursor-pointer w-10 h-10',
        onClick: handleNextClick
      })
    )
  );
};

export default TopProducts;
