// components/Footer.tsx
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Sección de Contacto */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center hover:text-green-400 transition-colors">
                <FaWhatsapp className="mr-3 text-green-400 text-2xl" />
                <a href="https://wa.me/573114678137" className="text-lg">
                  +57 311 4678137
                </a>
              </li>
              <li className="flex items-center hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     className="h-6 w-6 mr-3 text-blue-400" 
                     viewBox="0 0 20 20" 
                     fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href="mailto:procontelsb1@gmail.com" className="text-lg">
                  procontelsb1@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-6">Redes Sociales</h3>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/profile.php?id=100088919844846"
                 className="text-3xl hover:text-blue-500 transition-colors duration-300">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/procontel_sb/"
                 className="text-3xl hover:text-pink-500 transition-colors duration-300">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Sección de Horarios */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Horarios</h3>
            <p className="text-lg mb-2">Lunes a Viernes</p>
            <p className="text-lg">9:00 AM - 6:00 PM</p>
            <p className="mt-4 text-lg">Bogotá, Colombia</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Procontel SB. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;