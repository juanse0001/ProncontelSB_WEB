"use client"

import { useState, useEffect } from "react"
import { FaArrowUp, FaWhatsapp, FaPhone } from "react-icons/fa"
import { useIsMobile } from "../hooks/useIsMobile"

const FloatingActionButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { isMobile } = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Adjust position based on whether we have a bottom navigation
  const bottomPosition = isMobile ? "bottom-20" : "bottom-4"

  return (
    <div className={`fixed ${bottomPosition} right-4 z-40 flex flex-col items-end`}>
      {/* Main button that expands to show other options */}
      <button
        onClick={toggleExpand}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        aria-label="Opciones de contacto"
      >
        {isExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>

      {/* Expanded options */}
      <div
        className={`flex flex-col items-end space-y-3 mt-3 transition-all duration-300 ${
          isExpanded ? "opacity-100 transform translate-y-0" : "opacity-0 pointer-events-none transform translate-y-4"
        }`}
      >
        {/* WhatsApp button */}
        <a
          href="https://wa.me/573114678137"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 active:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          aria-label="Contactar por WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-xl" />
        </a>

        {/* Phone button */}
        <a
          href="tel:+573114678137"
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          aria-label="Llamar ahora"
        >
          <FaPhone className="text-xl" />
        </a>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 active:bg-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            aria-label="Volver arriba"
          >
            <FaArrowUp className="text-xl" />
          </button>
        )}
      </div>
    </div>
  )
}

export default FloatingActionButton
