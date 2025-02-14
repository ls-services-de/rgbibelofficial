import React from 'react';
import { FaDesktop, FaCode, FaBullhorn } from 'react-icons/fa';

const ContactCard = ({ icon: Icon, name, title, responsibilities, email }) => (
  <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-md flex flex-col items-center text-center w-full sm:w-[90%] mx-auto mt-[50px] relative">
    <Icon className="text-primary text-4xl mb-4" />
    <div className="absolute top-0 left-0 right-0 mt-[-30px] flex flex-col items-center">
      {/* Platzhalter für Bild */}
    </div>
    <h3 className="text-xl font-semibold text-white mt-[60px] mb-2">{name}</h3>
    <h4 className="text-lg text-primary-light mb-2">{title}</h4>
    <div className="border-b border-white w-full my-2" />
    <ul className="text-white mb-4 text-sm">
      {responsibilities.map((resp, index) => (
        <li key={index} className="mb-1 border-b border-white p-2">{resp}</li>
      ))}
    </ul>
    <p className="text-white mb-3">{email}</p>
    <a
      href={`mailto:${email}`}
      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors inline-block"
    >
      Kontakt aufnehmen
    </a>
  </div>
);

const ContactCards = () => {
  const contacts = [
    {
      icon: FaDesktop,
      name: "Tim",
      title: "PC & Hardware Experte",
      responsibilities: [
        "PC- und Hardwarefragen",
        "Custom-PC-Serie",
        "Technische Beratung",
        "Support für Fertig-PCs"
      ],
      email: "pc.rgbibelofficial@gmail.com"
    },
    {
      icon: FaCode,
      name: "Liam",
      title: "Web-Entwickler",
      responsibilities: [
        "Website-Entwicklung",
        "Garantieformulare",
        "Systemintegration",
        "Behebung von Website-Problemen"
      ],
      email: "web.rgbibelofficial@gmail.com"
    },
    {
      icon: FaBullhorn,
      name: "Eugen",
      title: "Marketing & PR Manager",
      responsibilities: [
        "Marketing & PR",
        "Social Media",
        "Kooperationen mit Partnern",
        "Influencer-Anfragen"
      ],
      email: "pr.rgbibelofficial@gmail.com"
    }
  ];

  return (
    <>
      {/* Hintergrundbild */}
      <div
        className="w-full bg-cover bg-center min-h-screen fixed top-0 left-0"
        style={{ backgroundImage: "url('/bg-details.png')" }}
      ></div>

      {/* Überschrift und Einleitung */}
      <div className="relative z-20 text-center text-white pt-16">
        <h1 className="text-3xl font-bold mb-4 text-primary">Kontaktieren Sie das richtige Team</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Wir bei RGBibelOfficial möchten Ihnen den bestmöglichen Support bieten. Damit Ihre Anfrage schnell und effizient bearbeitet wird, finden Sie hier die passenden Ansprechpartner für verschiedene Anliegen.
          Wählen Sie einfach den richtigen Kontakt aus, um direkt mit dem zuständigen Teammitglied in Verbindung zu treten.
        </p>
      </div>

      {/* Kontaktkarten */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
        {contacts.map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
      </div>
    </>
  );
};

export default ContactCards;
