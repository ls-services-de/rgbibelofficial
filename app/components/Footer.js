import React from 'react';

import { MapPin, Mail, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-card text-white py-8 mt-[200px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-[#04cefe]">RGBibel® UG</h2>
            <p className="mt-2">RGBibel® UG ist eine eingetragene Marke der RaRiTec UG.</p>
          </div>
          <div className="mb-8 md:mb-0 text-white">
      <a
        href="https://www.google.com/maps/place/August-Bebel-Straße+26-53,14482+Potsdam,+Deutschland"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start mt-4  transition-colors"
      >
        <MapPin className="w-6 h-6 mr-2 flex-shrink-0" />
        <div>
          <p>August-Bebel-Straße 26-53</p>
          <p>Medienhaus</p>
          <p>14482 Potsdam, Deutschland</p>
        </div>
      </a>

      <a
        href="mailto:info@rgbibelofficial.com"
        className="flex items-center mt-4  transition-colors"
      >
        <Mail className="w-6 h-6 mr-2 flex-shrink-0" />
        <span>info@rgbibelofficial.com</span>
      </a>

      <a href="https://wa.me/4915224572334" className="flex items-center mt-4  transition-colors">
      <FaWhatsapp className="w-6 h-6 mr-2 flex-shrink-0" />
        <span>+49 1522 4572334</span>
      </a>
    </div>
          <div className="flex flex-col space-y-2 mt-4 md:mt-0">
            {[
              { name: 'Impressum', url: '/impressum' },
              { name: 'Datenschutz', url: '/datenschutz' },
              { name: 'Garantiebestimmungen', url: '/garantiebestimmungen' },
              { name: 'AGB', url: '/agb' },
              { name: 'Widerrufsrecht', url: '/widerrufsrecht' },
              { name: 'Versand', url: '/versand' },
              { name: 'Kontakt', url: '/kontakt' },
              { name: 'Garantieüberprüfung', url: '/garantie' }
            ].map((item, index) => (
              <a href={item.url} key={index} className="flex items-center">
                <img src="/assets/mapicon.png" alt={item.name} className="w-4 h-4 mr-2"/>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="text-center mt-8 text-dimWhite">
          <p>2025 Liam Schneider - RGBibelOfficial | all rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
