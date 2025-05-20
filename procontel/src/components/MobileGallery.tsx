"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSwipe } from "../hooks/useSwipe"
import OptimizedImage from "./OptimizedImage"

interface GalleryImage {
  src: string
  mobileSrc?: string
  alt: string
  width?: number
  height?: number
}

interface MobileGalleryProps {
  images: GalleryImage[]
  className?: string
  aspectRatio?: string
  showThumbnails?: boolean
  lightbox?: boolean
}

const MobileGallery: React.FC<MobileGalleryProps> = ({
  images,
  className = "",
  aspectRatio = "aspect-w-16 aspect-h-9",
  showThumbnails = true,
  lightbox = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Handle next image
  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  // Handle previous image
  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  // Set up swipe handlers
  const swipeHandlers = useSwipe({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
  })

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index)
  }

  // Handle lightbox toggle
  const toggleLightbox = () => {
    if (lightbox) {
      setLightboxOpen(!lightboxOpen)
    }
  }

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxOpen])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [lightboxOpen])

  return (
    <div className={`${className}`} ref={galleryRef}>
      {/* Main gallery */}
      <div className={`relative overflow-hidden rounded-lg ${aspectRatio}`} {...swipeHandlers} onClick={toggleLightbox}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <OptimizedImage
              src={image.src}
              mobileSrc={image.mobileSrc}
              alt={image.alt}
              className="w-full h-full"
              objectFit="cover"
              width={image.width}
              height={image.height}
            />
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            prevImage()
          }}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 active:bg-opacity-80 focus:outline-none z-20"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            nextImage()
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 active:bg-opacity-80 focus:outline-none z-20"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="mt-4 flex overflow-x-auto space-x-2 pb-2 scroll-snap-x">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden scroll-snap-start focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                index === activeIndex ? "ring-2 ring-blue-500" : ""
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <OptimizedImage
                src={image.src}
                mobileSrc={image.mobileSrc}
                alt={image.alt}
                className="w-full h-full"
                objectFit="cover"
                width={64}
                height={64}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={toggleLightbox}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 active:bg-opacity-80 focus:outline-none"
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl max-h-full" {...swipeHandlers}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`transition-opacity duration-300 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto max-h-[80vh] mx-auto"
                  objectFit="contain"
                  width={image.width}
                  height={image.height}
                  priority={true}
                />
              </div>
            ))}

            {/* Lightbox navigation */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 active:bg-opacity-80 focus:outline-none"
              aria-label="Previous image"
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
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 active:bg-opacity-80 focus:outline-none"
              aria-label="Next image"
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
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileGallery
