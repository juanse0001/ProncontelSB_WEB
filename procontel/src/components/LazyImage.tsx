"use client"

import { useState, useEffect, useRef } from "react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  placeholderSrc?: string
}

const LazyImage = ({ src, alt, className = "", width, height, placeholderSrc }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Placeholder por defecto si no se proporciona uno
  const defaultPlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23cccccc'/%3E%3C/svg%3E"

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }, // Cargar la imagen cuando esté a 200px de entrar en la vista
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "auto" }}
      ref={imgRef}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ backgroundImage: `url(${placeholderSrc || defaultPlaceholder})`, backgroundSize: "cover" }}
        />
      )}

      {/* Imagen real */}
      {isInView && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}

export default LazyImage
