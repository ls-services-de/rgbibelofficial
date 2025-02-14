import React from 'react';


const PartnerSection = ({partners}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-4 ">
      <h2 className="text-4xl font-bold text-white mb-12">Unsere Partner</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center justify-center mt-6">
            <img src={partner.src} alt={partner.alt} className="max-w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerSection;
