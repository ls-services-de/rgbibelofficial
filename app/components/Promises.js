// components/PromisesSection.js
import React from 'react';


const Promises = ({promises}) => {
  return (
    <section className="relative w-full mt-[80px] bg-cover bg-center">
        <img src="/assets/gradient1.png" className='fixed translate-y-[-200vh] -z-10' alt="" />
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-white mb-12">Unsere Versprechen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {promises.map((promise, index) => (
          <div key={index} className="flex flex-col items-center mt-[40px]">
            <div className="bg-card p-8 rounded-full flex items-center justify-center w-32 h-32 mb-4">
              <img src={promise.icon} alt={promise.title} className="h-16 w-16" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{promise.title}</h3>
            <p className="text-dimWhite mt-0">{promise.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Promises;
