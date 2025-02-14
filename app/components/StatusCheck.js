// StatusCheck.js

'use client';

import React, { useState } from 'react';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '6fnwq7k5',
  dataset: 'production',
  apiVersion: '2023-11-21',
  useCdn: true,
  token: 'skYTgfsScgI25GMRQ3GAHnBepKCyf8qh0UEVQZSqh0WUtOobdY0lLpNY9fdhuxHhukmSQRWLbORed35KLNKpFcuxjnCkXGeXu88Xws27PavXhWZFsc5ebzTcTGQcCKjLN1O38vFi4WraXkeymmUqvjH7GbZXIGCkooi4mHjzNo1yoYM0E655',
});

const StatusCheck = () => {
  const [supportNumber, setSupportNumber] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSupportNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); // Reset status message
    setError(''); // Reset error message

    if (!supportNumber) {
      setError('Bitte geben Sie Ihre Support-Nummer ein.');
      return;
    }

    try {
      const query = `*[_type == "contactForm" && supportNumber == $supportNumber][0]{
        status
      }`;

      const params = { supportNumber };
      const result = await client.fetch(query, params);

      if (result) {
        setStatus(`Aktueller Status: ${result.status}`);
      } else {
        setError('Keine Anfrage mit dieser Support-Nummer gefunden.');
      }
    } catch (err) {
      console.error('Error fetching status:', err);
      setError('Es gab einen Fehler beim Abrufen des Status.');
    }
  };

  return (
    <div className="lg:max-w-[45%] w-full mx-auto mt-10 p-6 bg-card rounded-lg shadow-md" style={{ backgroundImage: "url('/bg-details.png')" }}>
      <h2 className="text-xl font-bold mb-4 text-center">Status Ihrer Anfrage prüfen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-white">Support-Nummer:</label>
          <input
            type="text"
            value={supportNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-primary rounded-md"
        >
          Status abrufen
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-primary">{status}</p>
      )}

      {error && (
        <p className="mt-4 text-center text-red-500">{error}</p>
      )}
    </div>
  );
};

export default StatusCheck;
