import React from 'react';
import ImageCarousel from './ImageCarousel'; // Ajusta la ruta si tu componente ImageCarousel está en otro archivo

const Hero = () => (
  <section id="home" className="pt-24 pb-12 bg-gradient-to-r from-primary-50 to-accent-50">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
          ¡Simplificamos tu facturación electrónica!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Facturación POS, plugin para WordPress, gestión de inventario y más.
        </p>
        <button className="bg-accent-500 text-white px-8 py-3 rounded-xl hover:bg-accent-600 transition-colors duration-300 shadow-lg">
          Solicita tu demo gratuita
        </button>
      </div>
      <div className="md:w-1/2 mt-12 md:mt-0">
        <ImageCarousel />
      </div>
    </div>
  </section>
);

export default Hero;