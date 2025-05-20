"use client"

import { useState, useEffect, useRef } from "react"
import { useIsMobile } from "../hooks/useIsMobile"
import { motion, AnimatePresence } from "framer-motion"

const servicios = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Facturación electrónica",
    description: "Emisión y gestión de documentos electrónicos con validación DIAN",
    link: "/facturacion-electronica",
    color: "blue",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "POS Integrado",
    description: "Sistema punto de venta con sincronización en tiempo real",
    link: "/pos-integrado",
    color: "green",
    image:
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Nómina electrónica",
    description: "Gestión automatizada de liquidación y pagos",
    link: "/nomina-electronica",
    color: "red",
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Documentos soporte",
    description: "Administración de facturas, notas crédito y débito",
    link: "/documentos-soporte",
    color: "purple",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    title: "Gestión de inventario",
    description: "Control preciso con alertas de stock mínimo",
    link: "/inventario",
    color: "orange",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Analítica avanzada",
    description: "Reportes personalizados y dashboards interactivos",
    link: "/analitica-avanzada",
    color: "teal",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  },
]

const getColorClass = (color) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "group-hover:bg-blue-600",
      border: "border-blue-200",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "group-hover:bg-green-600",
      border: "border-green-200",
      button: "bg-green-600 hover:bg-green-700",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      hover: "group-hover:bg-red-600",
      border: "border-red-200",
      button: "bg-red-600 hover:bg-red-700",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "group-hover:bg-purple-600",
      border: "border-purple-200",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      hover: "group-hover:bg-orange-600",
      border: "border-orange-200",
      button: "bg-orange-600 hover:bg-orange-700",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-600",
      hover: "group-hover:bg-teal-600",
      border: "border-teal-200",
      button: "bg-teal-600 hover:bg-teal-700",
    },
  }

  return colorMap[color] || colorMap.blue
}

const CarruselDeServicios = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef(null)
  const isMobile = useIsMobile()

  // Número de tarjetas a mostrar según el tamaño de la pantalla
  const getCardsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default para SSR
  }

  const [cardsToShow, setCardsToShow] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow())
    }

    // Establecer valor inicial
    handleResize()

    // Agregar event listener
    window.addEventListener("resize", handleResize)

    // Iniciar auto-rotación
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        nextSlide()
      }
    }, 5000)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAnimating])

  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex >= servicios.length - cardsToShow + 1 ? 0 : newIndex
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? servicios.length - cardsToShow : newIndex
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  // Manejadores táctiles para swipe en móvil
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

  const manejarIrAInventario = () => {
    window.location.href = "/inventario"
  }

  const visibleServices = servicios.slice(currentIndex, currentIndex + cardsToShow)

  return (
    <div
      className="relative pb-12"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Botones de navegación mejorados */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-gray-200 transition-all duration-300"
        aria-label="Diapositiva anterior"
        disabled={isAnimating}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex overflow-hidden px-8 md:px-10">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className="flex w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cardsToShow}, minmax(0, 1fr))`,
              gap: "1rem",
              width: "100%",
            }}
          >
            {visibleServices.map((servicio, index) => {
              const colorClasses = getColorClass(servicio.color)

              return (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  className="px-2 md:px-4 focus:outline-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
                    <div className={`h-1 ${colorClasses.button}`}></div>

                    {/* Imagen del servicio */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={servicio.image || "/placeholder.svg"}
                        alt={servicio.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6 md:p-8 text-center flex-grow">
                      <div
                        className={`${colorClasses.bg} w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6 ${colorClasses.text} ${colorClasses.hover} group-hover:text-white transition-colors duration-300`}
                      >
                        {servicio.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{servicio.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{servicio.description}</p>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                      {servicio.title === "Gestión de inventario" ? (
                        <button
                          onClick={manejarIrAInventario}
                          className={`${colorClasses.button} text-white px-4 md:px-6 py-2 rounded-lg text-sm font-medium focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95`}
                        >
                          Pruébalo 100% gratis
                        </button>
                      ) : (
                        <a
                          href={servicio.link}
                          className={`${colorClasses.text} hover:underline text-sm font-medium focus:outline-none transition-colors duration-300 inline-flex items-center`}
                        >
                          Ver más detalles
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-gray-200 transition-all duration-300"
        aria-label="Siguiente diapositiva"
        disabled={isAnimating}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de posición mejorados */}
      <div className="flex justify-center mt-6 space-x-2 md:space-x-3">
        {Array.from({ length: servicios.length - cardsToShow + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentIndex(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
              index === currentIndex ? "bg-blue-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}

const SeccionDeServicios = () => {
  const ctaRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up", "animate-on-scroll")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current)
      }
    }
  }, [])

  return (
    <section id="servicios" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Nuestros Servicios</h2>
          <div className="w-16 md:w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4 md:mb-6"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Explora nuestras soluciones diseñadas para optimizar tu facturación electrónica
          </p>
        </motion.div>

        <CarruselDeServicios />

        {/* Sección CTA con animaciones */}
        <motion.div
          ref={ctaRef}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 md:p-8 lg:p-10 text-center shadow-xl mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
            ¿Listo para simplificar tu facturación?
          </h3>
          <p className="text-blue-100 mb-5 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Descubre cómo nuestra solución puede transformar la gestión financiera de tu negocio.
          </p>
          <motion.button
            className="bg-white text-blue-600 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md hover:scale-105 transform active:scale-95 active:bg-gray-200"
            onClick={() => (window.location.href = "/contacto")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicita tu asesoria gratuita
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default SeccionDeServicios
