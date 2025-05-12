import React from 'react';
import ImageCarousel from './ImageCarousel';
import Logo from '../../public/assets/images/Logo.jpg';

const Hero = () => (
  <section
    id="home"
    className="pt-24 pb-12 bg-gradient-to-br from-[#001529] to-blue-800 relative"
  >
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-6 md:mb-0 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-20 md:mt-24">
          ¡Simplificamos tu facturación electrónica!
        </h1>
        <p className="text-lg text-gray-100 mt-4 mb-8">
          Facturación POS, Electronica, gestión de inventario y más.
        </p>
        <button className="bg-accent-500 text-white px-8 py-3 rounded-xl hover:bg-accent-600 transition-colors duration-300 shadow-lg">
          ¿Quienes somo y que hacemos?
        </button>
      </div>
      <div className="md:w-1/3 mt-10 md:mt-0 md:ml-16">
        <ImageCarousel />
      </div>
    </div>
  </section>
);

export default Hero;