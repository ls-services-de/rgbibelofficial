'use client'

import React, { useState } from 'react';
import sanityClient from '@sanity/client';
import { differenceInYears } from 'date-fns';

// Initialize Sanity Client
const client = sanityClient({
  projectId: '6fnwq7k5', // Replace with your Sanity projectId
  dataset: 'production', // Replace with your dataset name
  apiVersion: '2023-08-15', // Use the latest API version
  useCdn: true, // Use the CDN for faster loading
});

function WarrantyCheck() {
  const [pcNumber, setPcNumber] = useState('');
  const [warrantyStatus, setWarrantyStatus] = useState('');
  const [error, setError] = useState('');

  const fetchWarrantyStatus = async () => {
    const query = `*[_type == "order" && pcNumber == $pcNumber][0]{
      pcNumber,
      creationDate
    }`;

    const params = { pcNumber };

    try {
      const result = await client.fetch(query, params);
      if (result) {
        const creationDate = new Date(result.creationDate);
        const yearsSinceCreation = differenceInYears(new Date(), creationDate);

        console.log("Fetched creation date:", creationDate);
        console.log("Years since creation:", yearsSinceCreation);

        if (yearsSinceCreation > 2) {
          setWarrantyStatus('kostenpflichtig');
        } else {
          setWarrantyStatus('kostenlos');
        }
        setError('');
      } else {
        setWarrantyStatus('');
        setError('PC-Nummer nicht gefunden. Bitte überprüfen Sie Ihre Eingabe.');
      }
    } catch (err) {
      console.error(err);
      setError('Fehler beim Abrufen der Daten. Versuchen Sie es später erneut.');
    }
  };

  const handleSearch = () => {
    if (pcNumber) {
      fetchWarrantyStatus();
    } else {
      setError('Bitte geben Sie eine PC-Nummer ein.');
    }
  };

  return (
    <div className="flex flex-col">
      <div className='fixed h-[100vh] w-full -z-40' style={{ backgroundImage: "url('/bg-details.png')" }}></div>
      <div className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-16 text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">Garantie</h1>

        <p className="text-base md:text-lg mb-8">
        Die Garantiebedingungen der RGBIBEL UG gelten ausschließlich für von RGBIBEL zusammengebaute PCs und sind auf Endkunden innerhalb der EU beschränkt. 
        Die Garantie beträgt 2 Jahre ab Kaufdatum und umfasst Reparaturen sowie den Austausch von Teilen bei ordnungsgemäßem Gebrauch. 
        Ausgenommen sind Schäden durch unsachgemäße Handhabung, äußere Einwirkungen, Softwarefehler, Überhitzung, Verschleiß oder eigenständig durchgeführte Reparaturen. Für Software wird keine Garantie übernommen. 
        Es wird empfohlen, vor der Einsendung des PCs eine Datensicherung durchzuführen. 
        Der Kunde ist dafür verantwortlich, den PC sicher zu verpacken; unsachgemäße Verpackung kann zusätzliche Kosten verursachen.
        </p>

        <p className="mb-8 underline cursor-pointer text-primary"> <a href='/garantiebestimmungen'>Zu den Garantiebedingungen</a></p>
        <div className="mt-8">
          <a href="/empfehlung-garantie" className="bg-primary text-white p-3 rounded-md">
            Fehlerdiagnose
          </a>
          <p className='mt-5'>Um herauszufinden, ob das Problem direkt von Ihnen gelöst werden kann oder eine Reparatur durch uns erforderlich ist, klicken Sie bitte auf den Button. Sie werden zu einem kurzen Fragebogen weitergeleitet, der Ihnen hilft, das Problem einzugrenzen. Anschließend erhalten Sie eine Empfehlung, ob eine Einsendung des PCs notwendig ist oder das Problem mit unserer Unterstützung gelöst werden kann.</p>
        </div>

        <div className="mt-10">
          <h1 className='mb-5 text-xl md:text-2xl text-left'>Garantie überprüfen</h1>
          <div className="flex flex-col sm:flex-row items-center">
            <input 
              type="text" 
              placeholder="PC Nummer eingeben" 
              value={pcNumber} 
              onChange={(e) => setPcNumber(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 mb-4 sm:mb-0 sm:mr-2 w-full sm:w-auto text-black"
            />
            <button 
              onClick={handleSearch} 
              className="bg-primary text-white p-2 rounded-md w-full sm:w-auto">
              Prüfen
            </button>
          </div>

          {/* Warranty Status Below Input and Button on Small Screens */}
          {warrantyStatus && (
            <div className={`font-bold text-lg mt-4 sm:mt-0 ${warrantyStatus === 'kostenlos' ? 'text-green-500' : 'text-orange-500'}`}>
              {warrantyStatus === 'kostenlos' ? 'PC qualifiziert sich für die kostenlose Garantie.' : 'PC qualifiziert sich für die kostenpflichtige Garantie.'}
            </div>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default WarrantyCheck;
