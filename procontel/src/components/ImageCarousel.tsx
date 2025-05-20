"use client"
import { useRef, useEffect, useState } from "react"

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)

  // Use placeholder images that we know will work
  const images = [
    {
      id: 1,
      src: "https://via.placeholder.com/800x400?text=Facturacion+Electronica",
      alt: "Facturación Electrónica",
    },
    {
      id: 2,
      src: "https://via.placeholder.com/800x400?text=Software+Contable",
      alt: "Software Contable",
    },
    {
      id: 3,
      src: "https://via.placeholder.com/800x400?text=Gestion+de+Inventario",
      alt: "Gestión de Inventario",
    },
    {
      id: 4,
      src: "https://via.placeholder.com/800x400?text=Facturacion+POS",
      alt: "Facturación POS",
    },
  ]

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Set up auto-rotation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-auto overflow-hidden rounded-xl shadow-xl border border-gray-500">
      {/* Main image */}
      <div className="relative h-64 md:h-80">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ display: index === currentSlide ? "block" : "none" }}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
