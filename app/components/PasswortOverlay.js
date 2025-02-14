'use client'
import React, { useState } from "react";

const PasswordOverlay = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const correctPassword = process.env.NEXT_PUBLIC_PASSWORD_P; // Get password from .env file
  
    if (password === correctPassword) {
      onPasswordCorrect(); // Calls the callback function if the password is correct
    } else {
      setError("Falsches Passwort, bitte versuche es erneut.");
    }
  };
  

  return (
    <div className="fixed bottom-0 right-[35%] flex items-center justify-center  bg-opacity-70 text-white">
      <div className="p-8  rounded-md">
        <h1 className="text-sm mb-4">Passwort erforderlich</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="px-4 py-2 rounded-md mb-4 text-white bg-card"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
          />
          <button type="submit" className="bg-card  border-white px-6 py-2 rounded-md text-white ml-3">
            Einloggen
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordOverlay;
