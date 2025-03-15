'use client';

import React, { useState } from 'react';
import sanityClient from '@sanity/client';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Sanity client configuration
const client = sanityClient({
  projectId: '6fnwq7k5',
  dataset: 'production',
  apiVersion: '2023-11-21',
  useCdn: true,
  token: 'skYTgfsScgI25GMRQ3GAHnBepKCyf8qh0UEVQZSqh0WUtOobdY0lLpNY9fdhuxHhukmSQRWLbORed35KLNKpFcuxjnCkXGeXu88Xws27PavXhWZFsc5ebzTcTGQcCKjLN1O38vFi4WraXkeymmUqvjH7GbZXIGCkooi4mHjzNo1yoYM0E655',
});

const ProductReview = () => {
  const [pcNumber, setPcNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate PC number and fetch customer name
    try {
      const result = await client.fetch(
        `*[_type == "order" && pcNumber == $pcNumber][0]{
          pcNumber,
          customername
        }`,
        { pcNumber }
      );

      if (!result) {
        setError('Ungültige PC-Nummer. Bitte überprüfen Sie Ihre Eingabe.');
        return;
      }

      setCustomerName(result.customername);

      // Submit review to Sanity
      await client.create({
        _type: 'bewertung',
        pcnummer: pcNumber, // Store PC number as string
        Kundenname: result.customername,
        text: review,
        sterne: rating,
      });

      setSuccess('Vielen Dank für Ihre Bewertung!');
      setPcNumber('');
      setRating(0);
      setReview('');
      setCustomerName('');
    } catch (err) {
      console.error(err);
      setError('Es gab einen Fehler beim Absenden Ihrer Bewertung. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <>
     {/* Background Image */}
     <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center -z-10"></div>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-black opacity-90 -z-10"></div>
    <Header />
    <div className="max-w-md mx-auto mt-[90px] p-6 bg-card rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Produkt bewerten</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pcNumber" className="block text-sm font-medium text-dimWhite">PC-Nummer</label>
          <input
            id="pcNumber"
            type="text"
            value={pcNumber}
            onChange={(e) => setPcNumber(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        {customerName && (
          <div className="text-sm text-gray-600">
            Kundenname: {customerName}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-dimWhite">Bewertung</label>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl focus:outline-none ${
                  star <= rating ? 'text-primary' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-dimWhite">Ihre Bewertung</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Bewertung abschicken
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-600">{success}</p>}
    </div>
    <Footer />
    </>
  );
};

export default ProductReview;