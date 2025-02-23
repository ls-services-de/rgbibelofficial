'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// Testimonial data
const testimonials = [
  {
    text: "Ich habe Anfang des Jahres einen PC bei RGBIBEL bestellt und war begeistert: sicher verpackt, sofort einsatzbereit und bis heute einwandfrei im Betrieb. Kleinere Softwareprobleme wurden schnell und kompetent vom Support gelöst. Klare Empfehlung!",
    name: "Martin E.",
    image: "/default.jpg"
  },
  {
    text: "Der PC macht, was er soll – läuft schnell und ohne Probleme. Egal ob fürs Zocken, Arbeiten oder einfach für den Alltag, die Leistung reicht völlig aus. Alles fühlt sich hochwertig an, und bisher bin ich echt zufrieden. Preis Leistung ist top also kann ich die pc‘s nur empfehlen.",
    name: "Warmholdt G.",
    image: "/default.jpg"
  }
]

const Video = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 7000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <div className="flex flex-col items-center mt-[150px] justify-center text-white p-4">
      <h2 className="text-3xl font-bold text-white ">Kundenbewertungen</h2>
      <p className='mb-12'>Erfahren Sie, was Kunden über unsere Produkte sagen.</p>
      <div className="relative w-full max-w-xl">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="relative bg-card bg-opacity-50 rounded-lg p-6 shadow-lg">
                  <div className="absolute top-4 left-4">
                    <Image
                      src="/quotes.svg"
                      alt="Quotation mark"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-dimWhite mb-6 text-center text-xl max-w-3xl leading-relaxed pt-12">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center justify-end mt-4">
                    <div className="text-right mr-4">
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
       
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Video

