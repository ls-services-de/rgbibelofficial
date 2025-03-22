"use client"

import { useEffect, useState, useRef } from "react"
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react"

const LaunchOverlay = ({ endDate, onLaunchEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState({})
  const [countdownEnded, setCountdownEnded] = useState(false)
  const [inQueue, setInQueue] = useState(false)
  const [queuePosition, setQueuePosition] = useState(Math.floor(Math.random() * 200) + 300) // Random position between 300-500
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Handle audio playback
  useEffect(() => {
    // Try to play audio when component mounts
    if (audioRef.current) {
      const playAudio = async () => {
        try {
          // Set volume to make sure it's audible
          audioRef.current.volume = 0.5
          await audioRef.current.play()
          setIsPlaying(true)
          console.log("Audio playing successfully")
        } catch (error) {
          console.log("Auto-play prevented by browser. Adding click handler for user interaction.")

          // Add a click handler to the entire document to play audio on first user interaction
          const handleFirstInteraction = async () => {
            try {
              await audioRef.current.play()
              setIsPlaying(true)
              console.log("Audio started after user interaction")
              // Remove the event listener after successful play
              document.removeEventListener("click", handleFirstInteraction)
            } catch (err) {
              console.error("Failed to play audio after interaction:", err)
            }
          }

          document.addEventListener("click", handleFirstInteraction)
        }
      }

      playAudio()
    }

    return () => {
      // Cleanup - pause audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Update audio muted state when isMuted changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  // Toggle mute function
  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.volume === 0) {
        audioRef.current.volume = 0.5
      } else {
        audioRef.current.volume = 0
      }
      // Force a re-render
      setIsMuted(audioRef.current.volume === 0)
    }
  }

  // Toggle play/pause function
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((err) => console.error("Failed to play:", err))
      }
      setIsPlaying(!isPlaying)
    }
  }

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

  // Audio element for background music
  const audioElement = (
    <>
      <audio ref={audioRef} loop className="hidden">
        <source src="/startmusic.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Sound controls */}
      <div className="fixed top-6 right-6 z-[100] flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleMute()
          }}
          className="bg-gray-800/70 backdrop-blur-sm p-2 rounded-full hover:bg-gray-700/70 transition-colors cursor-pointer"
          aria-label={audioRef.current?.volume === 0 ? "Ton einschalten" : "Ton ausschalten"}
          type="button"
        >
          {audioRef.current?.volume === 0 ? (
            <VolumeX className="h-5 w-5 text-red-400" />
          ) : (
            <Volume2 className="h-5 w-5 text-green-400" />
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            togglePlayPause()
          }}
          className="bg-gray-800/70 backdrop-blur-sm p-2 rounded-full hover:bg-gray-700/70 transition-colors cursor-pointer"
          aria-label={isPlaying ? "Musik pausieren" : "Musik abspielen"}
          type="button"
        >
          {isPlaying ? <Pause className="h-5 w-5 text-red-400" /> : <Play className="h-5 w-5 text-green-400" />}
        </button>
      </div>

      {/* Now Playing panel */}
      {isPlaying && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-800/70 backdrop-blur-sm py-3 px-6 rounded-lg border border-gray-700 max-w-xs md:max-w-md w-full cursor-pointer">
          <Music className="text-purple-400 h-6 w-6 min-w-6" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs text-gray-400">Now Playing:</span>
            <div className="flex items-center">
              <span className="text-sm font-medium truncate">RGBibel Launch Theme</span>
              {audioRef.current?.volume === 0 && <span className="ml-2 text-xs text-red-400">(Stummgeschaltet)</span>}
              {!isPlaying && <span className="ml-2 text-xs text-yellow-400">(Pausiert)</span>}
            </div>
            <div className="w-full bg-gray-700/50 h-1 mt-1 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${
                  audioRef.current?.volume === 0 || !isPlaying ? "opacity-50" : ""
                } ${isPlaying ? "animate-progress" : ""}`}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Click to start music message - only shown if not playing yet */}
      {!isPlaying && (
        <div className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gray-800/70 py-2 px-4 rounded-full animate-pulse">
          <span className="text-xs text-white">Klicke auf den Bildschirm um die Musik zu starten</span>
        </div>
      )}

      {/* Music playing indicator */}
      {isPlaying && audioRef.current?.volume !== 0 && (
        <div className="fixed top-5 left-6 z-50 flex items-center gap-2 bg-gray-800/70 py-2 px-4 rounded-full">
          <div className="flex items-end h-4 gap-[2px]">
            <div className="w-1 h-2 bg-blue-400 animate-pulse-slow rounded-sm" style={{ animationDelay: "0ms" }}></div>
            <div
              className="w-1 h-3 bg-purple-400 animate-pulse-slow rounded-sm"
              style={{ animationDelay: "200ms" }}
            ></div>
            <div
              className="w-1 h-4 bg-pink-400 animate-pulse-slow rounded-sm"
              style={{ animationDelay: "400ms" }}
            ></div>
            <div
              className="w-1 h-2 bg-blue-400 animate-pulse-slow rounded-sm"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>
          <span className="text-xs text-white">Musik spielt</span>
        </div>
      )}
    </>
  )

  // Queue view - shown after countdown ends
  if (countdownEnded && inQueue) {
    return (
      <div className="fixed inset-0 flex items-center justify-center text-white overflow-hidden">
        {/* GIF Background with overlay for better text readability */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/bg.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay for readability */}
        {audioElement}
        <div className="text-center space-y-8 max-w-md mx-auto px-4 z-20 relative">
          <h1 className="text-4xl md:text-5xl font-thin tracking-wide">RGBibelOfficial Warteschlange</h1>

          <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
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
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 z-20" />
      </div>
    )
  }

  // Launch countdown view - shown initially
  return (
    <div className="fixed inset-0 flex items-center justify-center text-white overflow-hidden">
      {/* GIF Background with overlay for better text readability */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/bg.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay for readability */}
      {audioElement}
      <div className="text-center space-y-8 z-20 relative">
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
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 z-20" />
    </div>
  )
}

export default LaunchOverlay

