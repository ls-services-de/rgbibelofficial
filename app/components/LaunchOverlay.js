"use client"

import { useEffect, useState } from "react"

const LaunchOverlay = ({ endDate, onLaunchEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState({})
  const [countdownEnded, setCountdownEnded] = useState(false)
  const [inQueue, setInQueue] = useState(false)
  const [queuePosition, setQueuePosition] = useState(Math.floor(Math.random() * 200) + 300) // Random position between 300-500
  const [estimatedTime, setEstimatedTime] = useState(0)

  // Handle launch countdown
  useEffect(() => {
    if (inQueue) return

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
        setCountdownEnded(true)
        setInQueue(true) // Start the queue when countdown ends
      }
    }

    calculateTimeRemaining()
    const timer = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(timer)
  }, [endDate, inQueue])

  // Handle queue countdown - only starts after main countdown ends
  useEffect(() => {
    if (!inQueue) return

    // Calculate estimated time (capped at 5 minutes)
    setEstimatedTime(Math.min(5, Math.ceil((queuePosition * 0.6) / 60)))

    // Decrease queue position at varying speeds
    const queueTimer = setInterval(
      () => {
        setQueuePosition((prev) => {
          // Decrease by random amount (1-3 instead of 5-15)
          const decrease = Math.max(1, Math.floor(Math.random() * 3))
          const newPosition = prev - decrease

          // When queue is finished
          if (newPosition <= 0) {
            clearInterval(queueTimer)
            setInQueue(false)

            // Only call onLaunchEnd when queue is finished
            if (onLaunchEnd) {
              onLaunchEnd()
            }
            return 0
          }

          return newPosition
        })
      },
      800 + Math.random() * 400,
    ) // Random interval between 800-1200ms (slower)

    return () => clearInterval(queueTimer)
  }, [inQueue, onLaunchEnd])

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-light">{String(value).padStart(2, "0")}</span>
      <span className="text-xs uppercase tracking-wide mt-1">{label}</span>
    </div>
  )

  // Queue view - shown after countdown ends
  if (countdownEnded && inQueue) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-thin tracking-wide">RGBibel Warteschlange</h1>

          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="mb-6">
              <span className="text-2xl font-light">Position in der Warteschlange</span>
              <div className="text-5xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {queuePosition}
              </div>
            </div>

            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                style={{ width: `${100 - queuePosition / 5}%` }}
              />
            </div>

            <p className="text-gray-400 mt-6">
              Geschätzte Wartezeit: <span className="text-white">{estimatedTime} Minuten</span>
            </p>
          </div>

          <p className="text-gray-400 text-sm">
            Bitte schließen Sie diese Seite nicht. Ihr Platz in der Warteschlange geht sonst verloren.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
      </div>
    )
  }

  // Launch countdown view - shown initially
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-thin tracking-wide">RGBibel Launch</h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
          Ein neues Kapitel in der PC-Building-Erfahrung beginnt bald.
        </p>

        <div className="flex justify-center space-x-6 md:space-x-10">
          <TimeUnit value={timeRemaining.days || 0} label="Tage" />
          <TimeUnit value={timeRemaining.hours || 0} label="Stunden" />
          <TimeUnit value={timeRemaining.minutes || 0} label="Minuten" />
          <TimeUnit value={timeRemaining.seconds || 0} label="Sekunden" />
        </div>

        <div className="mt-12">
          <span className="text-gray-500 text-sm">Bleiben Sie gespannt auf etwas Außergewöhnliches</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </div>
  )
}

export default LaunchOverlay

