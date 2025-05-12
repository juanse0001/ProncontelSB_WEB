import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../../public/assets/images/Logo.jpg'; // Importa el logo

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Planes', href: '#pricing' },
    { name: 'Nuestros Clientes', href: '#Testimonios' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <header className="fixed w-full bg-primary-50 shadow-md z-50">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center"> {/* Contenedor para el logo y el título */}
            <img src={Logo.src} alt="Logo de Procontel SB" className="h-12 mr-2" />
            <h1 className="text-2xl font-bold text-secondary-500">Procontel SB</h1>
          </div>

          {/* Menú de Escritorio */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-secondary-500 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Botón de Menú Móvil Mejorado */}
          <button
            className="md:hidden text-2xl text-gray-700 hover:bg-gray-200 hover:rounded-md p-2 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-secondary-500 transition-colors duration-300 py-2" // Añadido padding vertical para mejor toque
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;