"use client"

import { useState, useEffect, useRef } from "react"
import { useIsMobile } from "../hooks/useIsMobile"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/router'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)
  const isMobile = useIsMobile()
  const router = useRouter()

  // Imágenes reales en lugar de placeholders
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
      mobileSrc:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80",
      alt: "Facturación Electrónica",
      title: "Facturación Electrónica",
      subtitle: "Cumple con la normativa DIAN de forma sencilla",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
      mobileSrc:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80",
      alt: "Software Contable",
      title: "Software Contable",
      subtitle: "Gestiona tu contabilidad de manera eficiente",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
      mobileSrc:
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80",
      alt: "Gestión de Inventario",
      title: "Gestión de Inventario",
      subtitle: "Control total de tus productos y existencias",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
      mobileSrc:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80",
      alt: "Facturación POS",
      title: "Facturación POS",
      subtitle: "Sistema de punto de venta integrado",
    },
  ]

  // Función para ir a la siguiente diapositiva
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Función para ir a la diapositiva anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Función para ir a una diapositiva específica
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Configurar rotación automática
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Agregar soporte para gestos táctiles
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  return (
    <section id="home" className="pt-20 md:pt-24 pb-8 md:pb-12 bg-gradient-to-br from-[#001529] to-blue-800 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mt-4 md:mt-24 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ¡Simplificamos tu facturación electrónica!
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-100 mt-4 mb-6 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Facturación POS, Electrónica, gestión de inventario y más.
          </motion.p>
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              onClick={() => router.push('/about')} 
              className="bg-accent-500 text-white px-6 md:px-8 py-3 rounded-xl hover:bg-accent-600 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
            >
              ¿Quiénes somos y qué hacemos?
            </button>
          </motion.div>
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-16">
          <div
            className="relative w-full h-auto overflow-hidden rounded-xl shadow-xl border border-gray-500"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carrusel principal mejorado */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                {images.map(
                  (image, index) =>
                    index === currentSlide && (
                      <motion.div
                        key={image.id}
                        className="absolute top-0 left-0 w-full h-full"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={isMobile ? image.mobileSrc : image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white text-xl font-bold">{image.title}</h3>
                          <p className="text-white/80 text-sm">{image.subtitle}</p>
                        </div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>

            {/* Botones de navegación mejorados */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 md:p-3 rounded-full hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white z-20 transition-all duration-300"
              aria-label="Diapositiva anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 md:p-3 rounded-full hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white z-20 transition-all duration-300"
              aria-label="Siguiente diapositiva"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores de diapositiva mejorados */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-3 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-500 rounded-full opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white rounded-full opacity-5"></div>
      </div>
    </section>
  )
}

export default Hero
