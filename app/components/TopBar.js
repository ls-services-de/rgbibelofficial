'use client';

import React, { useState } from 'react';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

const TopBar = ({ step, steps, setStep }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-40 lg:hidden mt-[70px] ">
      <div className="flex justify-between items-center" onClick={() => setIsOpen(!isOpen)}>
        <span className="md:hidden">Schritt {step}: {steps[step - 1]?.name || "Unbekannt"}</span>
        <span className="hidden md:inline">
          {steps.map((s, index) => (
            <span key={s.id} className={`mr-4 ${step === s.id ? 'text-cyan-500' : ''}`}>
              {s.name}
            </span>
          ))}
        </span>
        <button className="md:hidden">
          {isOpen ? <MdArrowDropUp className="h-6 w-6" /> : <MdArrowDropDown className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 md:hidden">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`py-2 ${step === s.id ? 'text-cyan-500' : ''}`}
              onClick={() => {
                setStep(s.id);
                setIsOpen(false);
              }}
            >
              {s.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBar;
