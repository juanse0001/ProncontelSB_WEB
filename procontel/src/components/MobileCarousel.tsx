"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { useSwipe } from "../hooks/useSwipe"
import { useIsMobile } from "../hooks/useIsMobile"

interface MobileCarouselProps {
  children: ReactNode[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  infiniteLoop?: boolean
  className?: string
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  infiniteLoop = true,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { isMobile } = useIsMobile()
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const totalSlides = children.length

  // Handle next slide
  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prevIndex) => {
      if (prevIndex === totalSlides - 1) {
        return infiniteLoop ? 0 : prevIndex
      }
      return prevIndex + 1
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  // Handle previous slide
  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) {
        return infiniteLoop ? totalSlides - 1 : prevIndex
      }
      return prevIndex - 1
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  // Go to specific slide
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return

    setIsAnimating(true)
    setActiveIndex(index)

    setTimeout(() => setIsAnimating(false), 500)
  }

  // Set up swipe handlers
  const swipeHandlers = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  })

  // Set up auto play
  useEffect(() => {
    if (autoPlay && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [autoPlay, interval, isPaused])

  // Pause auto play on hover or touch
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)
  const handleTouchStart = () => setIsPaused(true)
  const handleTouchEnd = () => {
    // Small delay to ensure the swipe is processed first
    setTimeout(() => setIsPaused(false), 300)
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...swipeHandlers}
      onTouchStart={(e) => {
        handleTouchStart()
        swipeHandlers.onTouchStart(e)
      }}
      onTouchEnd={(e) => {
        handleTouchEnd()
        swipeHandlers.onTouchEnd(e)
      }}
    >
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 active:bg-opacity-80 focus:outline-none z-10"
            aria-label="Previous slide"
            style={{
              width: isMobile ? "40px" : "48px",
              height: isMobile ? "40px" : "48px",
              touchAction: "manipulation",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 active:bg-opacity-80 focus:outline-none z-10"
            aria-label="Next slide"
            style={{
              width: isMobile ? "40px" : "48px",
              height: isMobile ? "40px" : "48px",
              touchAction: "manipulation",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full focus:outline-none transition-colors ${
                index === activeIndex ? "bg-white" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              style={{ touchAction: "manipulation" }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileCarousel
