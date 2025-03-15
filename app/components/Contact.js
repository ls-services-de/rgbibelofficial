'use client';

import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import { useUser } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';

const client = sanityClient({
  projectId: '6fnwq7k5',
  dataset: 'production',
  apiVersion: '2023-11-21',
  useCdn: true,
  token: 'skYTgfsScgI25GMRQ3GAHnBepKCyf8qh0UEVQZSqh0WUtOobdY0lLpNY9fdhuxHhukmSQRWLbORed35KLNKpFcuxjnCkXGeXu88Xws27PavXhWZFsc5ebzTcTGQcCKjLN1O38vFi4WraXkeymmUqvjH7GbZXIGCkooi4mHjzNo1yoYM0E655',
});

const ContactForm = () => {
  const { user, isSignedIn } = useUser();

  const handleFetchUserData = () => {
    if (user) {
      setFormData({
        ...formData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        
      });
    }
  };

  useEffect(() => {
    if (user && user.unsafeMetadata && user.unsafeMetadata.pcNumbers) {
      setPcNumbers(user.unsafeMetadata.pcNumbers); // PC-Nummern aus den Metadaten laden
    }
  }, [user]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    pcNumber: '',
    message: '',
    file: null,
  });

  const [status, setStatus] = useState('');
  const [supportNumber, setSupportNumber] = useState('');
  const [displayedSupportNumber, setDisplayedSupportNumber] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false); // New state for popup visibility
  const [pcNumbers, setPcNumbers] = useState([]);

  useEffect(() => {
    const uniqueSupportNumber = `S_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setSupportNumber(uniqueSupportNumber);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setFormData({
        ...formData,
        file: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.message || !formData.lastName) {
      setStatus('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    try {
      let fileUpload = null;

      if (formData.file) {
        const fileAsset = await client.assets.upload('file', formData.file);
        fileUpload = fileAsset._id;
      }

      const submissionData = {
        _type: 'contactForm',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        supportNumber: supportNumber,
        pcNumber: formData.pcNumber || '',
        status: 'offen',
        timestamp: new Date().toISOString(),
      };

      if (fileUpload) {
        submissionData.file = { _type: 'file', asset: { _ref: fileUpload } };
      }

      await client.create(submissionData);

      // Set the displayed support number
      setDisplayedSupportNumber(supportNumber);
      setStatus('Formular erfolgreich gesendet!');
      setIsPopupVisible(true); // Show the popup on success
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Es gab einen Fehler beim Senden des Formulars.');
    } finally {
      // Reset form data after submission
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        pcNumber: '',
        message: '',
        file: null,
      });
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="min-h-screen mt-20 py-10 px-4 sm:px-6 lg:px-8 mb-10">
      <div className="fixed h-[100vh] top-0 w-full -z-40" style={{ backgroundImage: "url('/bg-shop.png')" }}></div>
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Kontaktformular</h2>
        <>
        {isSignedIn ? (
        <button
        type="button"
        onClick={handleFetchUserData}
        className="w-full py-2 text-black bg-white rounded-md mb-7"
      >
        Daten aus Konto übernehmen </button> ) :(
          <SignInButton mode="modal">
                    <button
                      type="button"
                      className="w-full py-2 text-black bg-white rounded-md mb-4"
                    >
                      Anmelden um Daten aus dem Konto abzurufen
                    </button>
                  </SignInButton>
      )}
      </>
     
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain unchanged */}
          <div>
            <label className="block text-sm font-medium text-white">Vorname (optional):</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border text-white bg-card border-white rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Nachname:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border text-white bg-card border-white rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Telefonnummer (optional):</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border text-white bg-card border-white rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Email-Adresse:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border text-white bg-card border-white rounded-md p-2 w-full"
            />
          </div>

          {/* Dropdown oder manuelles Eingabefeld für PC-Nummer */}
          {pcNumbers.length > 0 ? (
            <div>
              <label className="block text-sm font-medium text-white">PC Nummer:</label>
              <select
                name="pcNumber"
                value={formData.pcNumber}
                onChange={handleChange}
                className="border text-white bg-card border-white rounded-md p-2 w-full"
              >
                <option value="">PC-Nummer auswählen</option>
                {pcNumbers.map((pc) => (
                  <option key={pc} value={pc}>
                    {pc}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-white">PC Nummer (optional):</label>
              <input
                type="text"
                name="pcNumber"
                value={formData.pcNumber}
                onChange={handleChange}
                className="border text-white bg-card border-white rounded-md p-2 w-full"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white">Anliegen:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border text-white bg-card border-white rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Datei hochladen (optional):</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="border text-white bg-card border-white rounded-md p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-primary rounded-md"
          >
            Senden
          </button>
        </form>

        {displayedSupportNumber && (
          <p className="mt-4 text-center text-primary">
            Ihre Support-Nummer: {displayedSupportNumber}
          </p>
        )}

        {status && (
          <p className={`mt-4 text-center ${status.includes('erfolgreich') ? 'text-green-500' : 'text-red-500'}`}>
            {status}
          </p>
        )}

        {formData.pcNumber && (
          <p className="mt-2 text-center text-white">
            PC Nummer vorhanden: {formData.pcNumber}
            {formData.pcNumber ? (
              <span className="ml-2 text-green-500">✔️</span> // Checkmark if PC number exists
            ) : (
              <span className="ml-2 text-red-500">❌</span> // Cross if no PC number
            )}
          </p>
        )}
      </div>

      {/* Popup for submission result */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-xl text-black font-bold mb-4">Formular erfolgreich gesendet!</h2>
            <p className="mb-2">Ihre Support-Nummer: {displayedSupportNumber}</p>
            <p>Bitte speichern Sie diese Nummer, um den aktuellen Status Ihrer Anfrage zu erfragen.</p>
            {formData.pcNumber ? (
              <p className="mb-2">PC Nummer vorhanden: {formData.pcNumber} <span className="text-green-500">✔️</span></p>
            ) : (
              <p></p>
            )}
            <button className="mt-4 py-2 px-4 bg-primary text-white rounded" onClick={closePopup}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
