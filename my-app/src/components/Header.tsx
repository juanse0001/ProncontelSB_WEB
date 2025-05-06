import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Planes', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <header className="fixed w-full bg-primary-50 shadow-md z-50"> {/* Aplicamos primary-50 y shadow-md */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-secondary-500">Procontel SB</h1> {/* Usamos secondary-500 para el título */}
          
          {/* Menú de Escritorio */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-secondary-500 transition-colors duration-300" /* Ajustamos colores */
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Botón de Menú Móvil */}
          <button
            className="md:hidden text-2xl text-gray-700 hover:text-secondary-500" /* Ajustamos color del icono */
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
                className="block text-gray-700 hover:text-secondary-500 transition-colors duration-300" /* Ajustamos colores */
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
