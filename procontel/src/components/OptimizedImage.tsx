"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useIsMobile } from "../hooks/useIsMobile"

interface OptimizedImageProps {
  src: string
  mobileSrc?: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  quality?: number
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  mobileSrc,
  alt,
  className = "",
  width,
  height,
  priority = false,
  loading = "lazy",
  sizes = "100vw",
  objectFit = "cover",
  quality = 75,
}) => {
  const { isMobile, deviceType } = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Choose appropriate image source based on device
  const imageSrc = isMobile && mobileSrc ? mobileSrc : src

  // Determine appropriate loading strategy
  const loadingStrategy = priority ? "eager" : loading

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  // Calculate appropriate image dimensions for the device
  const getImageDimensions = () => {
    if (width && height) {
      if (deviceType === "mobile") {
        // Reduce dimensions for mobile to save bandwidth
        return {
          width: Math.round(width * 0.7),
          height: Math.round(height * 0.7),
        }
      }
      return { width, height }
    }
    return {}
  }

  const dimensions = getImageDimensions()

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
      }}
      ref={imgRef}
    >
      {/* Placeholder/skeleton */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundSize: objectFit,
            borderRadius: "inherit",
          }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ objectFit }}
          onLoad={handleLoad}
          loading={loadingStrategy}
          width={dimensions.width}
          height={dimensions.height}
          sizes={sizes}
        />
      )}
    </div>
  )
}

export default OptimizedImage
