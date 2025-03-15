'use client'

import React, { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [settings, setSettings] = useState({
    marketing: false,
    analytics: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    } else {
      try {
        const savedConsent = JSON.parse(consent)
        if (new Date(savedConsent.expiry) > new Date()) {
          setSettings(savedConsent.settings)
        } else {
          setIsVisible(true)
        }
      } catch (e) {
        setIsVisible(true)
      }
    }
  }, [])

  const saveConsent = (settings) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7) // 7 days from now

    localStorage.setItem('cookieConsent', JSON.stringify({
      settings,
      expiry: expiryDate.toISOString()
    }))
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      marketing: true,
      analytics: true
    }
    setSettings(allAccepted)
    saveConsent(allAccepted)
  }

  const handleSaveSelection = () => {
    saveConsent(settings)
  }

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Cookie Einstellungen</h2>
          <span className="text-2xl">🍪</span>
        </div>

        <p className="text-sm text-dimWhite">
          Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen,
          diese Website und deine Erfahrung zu verbessern.
        </p>

        <div className="flex gap-2 text-sm">
          <a href="/impressum" className="text-primary hover:underline">Impressum</a>
          <span className="text-gray-400">·</span>
          <a href="/datenschutz" className="text-primary hover:underline">Datenschutz</a>
        
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium">Notwendige Cookies</div>
            <p className="text-sm text-gray-500 mt-1">
              Diese Cookies sind für die Grundfunktionen der Website erforderlich.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">Cookies für Marketing</div>
              <p className="text-sm text-gray-500 mt-1">
                Helfen uns, die Werbung für Sie zu personalisieren.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.marketing}
                onChange={() => handleToggle('marketing')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">Cookies für Analyse</div>
              <p className="text-sm text-gray-500 mt-1">
                Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.analytics}
                onChange={() => handleToggle('analytics')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button 
            className="w-full bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded"
            onClick={handleAcceptAll}
          >
            Alle Cookies akzeptieren
          </button>
          <button 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={handleSaveSelection}
          >
            Nur Auswahl speichern
          </button>
        </div>
      </div>
    </div>
  )
}

