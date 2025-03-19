"use client"

import { useState } from "react"

const PasswordOverlay = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const correctPassword = process.env.NEXT_PUBLIC_PASSWORD_P // Get password from .env file

    if (password === correctPassword) {
      onPasswordCorrect() // Calls the callback function if the password is correct
    } else {
      setError("Falsches Passwort, bitte versuche es erneut.")
    }
  }

  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center p-4 ">
      <div className="max-w-sm w-full">
        <h1 className="text-sm mb-2 text-center text-white">Passwort erforderlich</h1>
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
          <input
            type="password"
            className="px-4 py-2 rounded-l-md text-white bg-card w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
          />
          <button type="submit" className="bg-card  px-6 py-2 rounded-r-md text-white ml-2">
            Einloggen
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  )
}

export default PasswordOverlay

