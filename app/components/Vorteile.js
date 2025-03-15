// components/PromisesSection.js
import React from 'react';


const Vorteile = ({vorteile}) => {
  return (
    <section className="relative w-full mt-[80px] bg-cover bg-center">
        <img src="/assets/gradient1.png" className='fixed translate-y-[-200vh] -z-10' alt="" />
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-white mb-12">Einzigartig und unnverkennbar</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        {vorteile.map((vorteil, index) => (
          <div key={index} className="flex flex-col items-center mt-[40px]">
            <div className="rounded p-8  flex items-center justify-center  mb-4">
              <img src={vorteil.icon} alt={vorteil.title} className="w-[200px] h-auto rounded" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{vorteil.title}</h3>
            <p className="text-dimWhite mt-0">{vorteil.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Vorteile;
