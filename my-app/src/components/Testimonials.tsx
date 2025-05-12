import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      text: "El mejor sistema de facturación que hemos usado. ¡Altamente recomendado!",
      author: "Juan Pérez - Tienda XYZ",
    },
    {
      text: "La implementación fue sencilla y el soporte excelente.",
      author: "María Gómez - Restaurante ABC",
    },
  ];

  return (
    <section
      id='Testimonios'
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/Clientess.png')", // Ruta relativa a 'public'
        backgroundSize: "cover", // Para que la imagen cubra todo el fondo
        backgroundPosition: "center" // Para centrar la imagen en el fondo
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white bg-opacity-90 rounded-xl border-l-8 border-red-600 shadow-xl"
              initial={{ opacity: 0, y: 50 }} // Estado inicial para la animación de entrada
              whileInView={{ opacity: 1, y: 0 }} // Estado al estar visible en la pantalla
              viewport={{ once: true }} // Animar solo una vez al entrar en la vista
              transition={{ duration: 0.5, delay: index * 0.1 }} // Duración y pequeño retraso para cada testimonio
              whileHover={{ scale: 1.02 }} // Ligero aumento al pasar el ratón
            >
              <div className="mb-6 text-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-70"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-lg text-gray-800 mb-6 font-medium">"{testimonial.text}"</p>
              <p className="font-bold text-red-700">- {testimonial.author}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300">
            Ver más testimonios
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;