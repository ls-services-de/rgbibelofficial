'use client'

import React, { useEffect, useState } from "react"

const LaunchOverlay = ({ endDate, onLaunchEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState({})

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const end = new Date(endDate)
      const difference = end - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeRemaining({ days, hours, minutes, seconds })
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (onLaunchEnd) {
          onLaunchEnd()
        }
      }
    }

    calculateTimeRemaining()
    const timer = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(timer)
  }, [endDate, onLaunchEnd])

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-light">{String(value).padStart(2, '0')}</span>
      <span className="text-xs uppercase tracking-wide mt-1">{label}</span>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-thin tracking-wide">
          RGBibel Launch
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
          Ein neues Kapitel in der PC-Building-Erfahrung beginnt bald.
        </p>
        
        <div className="flex justify-center space-x-6 md:space-x-10">
          <TimeUnit value={timeRemaining.days} label="Tage" />
          <TimeUnit value={timeRemaining.hours} label="Stunden" />
          <TimeUnit value={timeRemaining.minutes} label="Minuten" />
          <TimeUnit value={timeRemaining.seconds} label="Sekunden" />
        </div>

        <div className="mt-12">
          <span className="text-gray-500 text-sm">
            Bleiben Sie gespannt auf etwas Außergewöhnliches
          </span>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </div>
  )
}

export default LaunchOverlay