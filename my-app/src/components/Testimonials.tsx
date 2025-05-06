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
    <section className="py-16 bg-gray-50"> {/* Cambiamos el color de fondo a uno de la paleta */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-secondary-800 text-center mb-12">Lo que dicen nuestros clientes</h2> {/* Color del título */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl border-l-4 border-accent-500 shadow-md transition-all duration-300 hover:shadow-lg"  // Mejoramos la tarjeta y el color del borde
              whileHover={{ y: -5 }} // Agregamos un efecto de elevación al hacer hover
            >
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p> {/* Color del texto del testimonio */}
              <p className="font-semibold text-gray-900">- {testimonial.author}</p> {/* Color del autor */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
