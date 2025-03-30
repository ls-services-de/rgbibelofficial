"use client"
import { useEffect, useState, useRef } from "react"
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react"

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef(null)

  // Assume the first item is a video
  const hasVideo = images.length > 0 && images[0].type === "video"
  const isVideoPlaying = hasVideo && currentIndex === 0

  useEffect(() => {
    // If we're on the video slide, let the video control timing
    if (isVideoPlaying) {
      setProgress(0)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch((err) => console.error("Video autoplay failed:", err))
      }
      return
    }

    // For image slides, use the timer
    if (isPaused) return

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
          return 0
        }
        return prevProgress + 0.1 // Adjust the increment to fill in 5 seconds
      })
    }, 5) // Update progress every 5ms

    return () => clearInterval(interval)
  }, [images.length, isPaused, currentIndex, isVideoPlaying])

  // Handle video end event
  const handleVideoEnded = () => {
    goToNext()
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setProgress(0)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setProgress(0)
  }

  const togglePause = () => {
    if (isVideoPlaying && videoRef.current) {
      if (isPaused) {
        videoRef.current.play().catch((err) => console.error("Video play failed:", err))
      } else {
        videoRef.current.pause()
      }
    }
    setIsPaused(!isPaused)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          {item.type === "video" && index === 0 ? (
            // Video slide
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={item.src}
                className="w-full h-full object-cover"
                muted={false}
                playsInline
                onEnded={handleVideoEnded}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
            </div>
          ) : (
            // Image slide
            <>
              <img src={item.src || "/placeholder.svg"} alt={item.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </>
          )}

          <div className="absolute bottom-[40px] sm:bottom-[80px] left-1/2 transform -translate-x-1/2 text-center text-white">
            <h1 className="text-[32px] sm:text-[64px] font-spartan tracking-[10px] sm:tracking-[25px] uppercase">
              {item.title}
            </h1>
            <p className="text-[16px] sm:text-[30px] font-spartan uppercase text-[#e4e4e4] mt-[-10px] sm:mt-[-15px]">
              {item.caption}
            </p>
          </div>
        </div>
      ))}

      {/* Progress bar and controls container */}
      <div className="absolute bottom-4 sm:bottom-10 left-0 right-0 px-2 sm:px-8">
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
          {/* Left side controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={togglePause}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-1/3 sm:w-1/3 h-1 bg-white mx-2">
            <div
              className="bg-[#04cefe] h-full"
              style={{
                width:
                  isVideoPlaying && videoRef.current
                    ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%`
                    : `${progress}%`,
                transition: isPaused ? "none" : "width 0.1s linear",
              }}
            ></div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            <button
              onClick={goToNext}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider

