"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Testimonial {
  _id: string;
  author: string;
  avatar?: string;
  text: string;
  company?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    text: '',
    company: '',
    rating: 5
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

  // Función para cargar testimonios desde localStorage
  const loadCachedTestimonials = () => {
    try {
      const cachedData = localStorage.getItem('testimonials_cache');
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // Verificar si el caché tiene menos de 1 hora
        const isCacheValid = Date.now() - timestamp < 3600000; // 1 hora en milisegundos
        if (isCacheValid) {
          return data;
        }
      }
    } catch (error) {
      console.error('Error al cargar testimonios del caché:', error);
    }
    return null;
  };

  // Función para guardar testimonios en localStorage
  const saveTestimonialsToCache = (data: Testimonial[]) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem('testimonials_cache', JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error al guardar testimonios en caché:', error);
    }
  };

  // Cargar testimonios
  useEffect(() => {
    const loadTestimonials = async () => {
      // Intentar cargar desde caché primero
      const cachedTestimonials = loadCachedTestimonials();
      if (cachedTestimonials) {
        setTestimonials(cachedTestimonials);
      }

      // Intentar obtener datos frescos del servidor
      try {
        const response = await fetch(`${API_URL}/api/testimonials`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          saveTestimonialsToCache(data);
        } else if (!cachedTestimonials) {
          toast.error('No se encontraron testimonios disponibles.');
        }
      } catch (error) {
        if (!cachedTestimonials) {
          toast.error('No se pudieron cargar los testimonios. Por favor, verifica que el servidor esté corriendo.');
        }
      }
    };

    loadTestimonials();
  }, []);

  // Configurar rotación automática
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Renderizar estrellas para la calificación
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/api/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar testimonio');
      }

      toast.success('¡Gracias por tu testimonio! Será revisado por nuestro equipo.');
      setShowForm(false);
      setFormData({ author: '', text: '', company: '', rating: 5 });
      
      // Actualizar testimonios y caché después de enviar uno nuevo
      const updatedResponse = await fetch(`${API_URL}/api/testimonials`);
      const updatedData = await updatedResponse.json();
      if (Array.isArray(updatedData)) {
        setTestimonials(updatedData);
        saveTestimonialsToCache(updatedData);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al enviar testimonio');
    }
  };

  return (
    <section
      id='Testimonios'
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: "url('Clientess.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Capa oscura semitransparente para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-blue-900 bg-opacity-80 px-4 py-2 rounded-lg">Lo que dicen nuestros clientes</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white max-w-2xl mx-auto bg-blue-900 bg-opacity-70 px-4 py-2 rounded-lg">
            Experiencias reales de negocios como el tuyo
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Testimonio anterior"
            disabled={isAnimating}
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Siguiente testimonio"
            disabled={isAnimating}
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

          {/* Carrusel de testimonios */}
          <div className="overflow-hidden">
            <div className="relative h-full">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`${index === currentIndex ? "block" : "hidden"}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white bg-opacity-95 p-6 md:p-8 rounded-xl border-l-8 border-red-600 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.avatar || '/user-avatar-placeholder.png'}
                          alt={testimonial.author || 'Usuario anónimo'}
                          className="w-20 h-20 rounded-full object-cover border-4 border-red-600"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
                        <p className="text-lg md:text-xl text-gray-800 mb-4 italic">"{testimonial.text}"</p>
                        <div className="flex flex-col">
                          <span className="font-bold text-red-700">{testimonial.author || 'Usuario anónimo'}</span>
                          {testimonial.company && <span className="text-gray-600">{testimonial.company}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Indicadores de posición */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>

        {/* Botón para mostrar formulario */}
        <div className="mt-16 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300"
            >
              Dejar un testimonio
            </button>
          ) : (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    placeholder="Introduce tu nombre"
                    aria-label="Tu Nombre"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tu testimonio
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={4}
                    required
                    placeholder="Escribe tu testimonio aquí..."
                    aria-label="Tu testimonio"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Empresa (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Nombre de tu empresa (opcional)"
                    aria-label="Empresa"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Calificación
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        {renderStars(star)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Enviar testimonio
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
