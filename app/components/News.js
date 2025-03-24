"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"

// Sanity client configuration
import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: "6fnwq7k5",
  dataset: "production",
  apiVersion: "2023-08-15",
  useCdn: true,
})

export default function NewsBanner() {
  const [newsText, setNewsText] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const [isSliding, setIsSliding] = useState(true)
  const textRef = useRef(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        // Get current date in ISO format
        const now = new Date().toISOString()

        // Fetch news items that are currently active based on date range
        // If StartDate is not set or is before now, and EndDate is not set or is after now
        const query = `*[_type == "news" && 
          (StartDate <= $now || StartDate == null) && 
          (EndDate >= $now || EndDate == null)
        ] | order(_createdAt desc)[0]`

        const news = await client.fetch(query, { now })

        if (news && news.text) {
          setNewsText(news.text)
          // Start animation after content is loaded
          setTimeout(() => {
            setIsAnimated(true)

            // Stop the sliding animation after 1.5 seconds
            setTimeout(() => {
              setIsSliding(false)
            }, 1500)
          }, 100)
        }
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Don't render anything if there's no news or still loading
  if (isLoading || !newsText) {
    return null
  }

  // Handle closing the banner completely
  const closeBanner = () => {
    setIsVisible(false)
  }

  // Handle collapsing/expanding the banner
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Inline styles for animations
  const bannerStyle = {
    transform: isAnimated ? "translateY(0)" : "translateY(-100%)",
    opacity: isAnimated ? 1 : 0,
    transition: "transform 0.5s ease-out, opacity 0.5s ease-out, height 0.3s ease-in-out",
  }

  // Text sliding animation style
  const textStyle = {
    transform: isSliding ? "translateX(100%)" : "translateX(0)",
    transition: "transform 1.5s ease-out",
  }

  return isVisible ? (
    <div
      className={`w-full bg-[#3b3b3b] text-white fixed top-[72px] z-40 ${isCollapsed ? "h-2" : "py-2"}`}
      style={bannerStyle}
    >
      <div className="container mx-auto px-4 relative">
        {/* Only show buttons and text when not collapsed */}
        {!isCollapsed && (
          <>
            {/* Close button */}
            <button
              onClick={closeBanner}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close news banner"
            >
              <X size={16} />
            </button>

            {/* Collapse/Expand button */}
            <button
              onClick={toggleCollapse}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 focus:outline-none"
              aria-label="Collapse news banner"
            >
              <ChevronUp size={16} />
            </button>

            {/* News content - slides in from right, then stops in center */}
            <div className="overflow-hidden flex justify-center items-center h-auto py-1">
              <p ref={textRef} className="text-sm md:text-base text-center px-8" style={textStyle}>
                {newsText}
              </p>
            </div>
          </>
        )}

        {/* When collapsed, show only the expand button */}
        {isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Expand news banner"
          >
            <ChevronDown size={12} />
          </button>
        )}
      </div>
    </div>
  ) : null
}

