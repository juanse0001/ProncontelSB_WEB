import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  return (
    <section id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Sección de Contacto */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
              <FaEnvelope className="mr-2 text-accent-500" /> Contacto y soporte 
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center transition-colors duration-300">
                <FaWhatsapp className="mr-3 text-accent-500 text-xl md:text-2xl flex-shrink-0" />
                <a
                  href="https://wa.me/573114678137"
                  className="text-base md:text-lg hover:text-accent-300 active:text-accent-400"
                  aria-label="Contactar por WhatsApp"
                >
                  +57 3148809351
                </a>
              </li>
              <li className="flex items-center transition-colors duration-300">
                <FaEnvelope className="mr-3 text-accent-500 text-xl flex-shrink-0" />
                <a
                  href="mailto:procontelsb1@gmail.com"
                  className="text-base md:text-lg hover:text-accent-300 active:text-accent-400 break-all"
                  aria-label="Enviar correo electrónico"
                >
                  procontelsb1@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
              <FaFacebook className="mr-2 text-accent-500" /> Redes Sociales
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/profile.php?id=61569872082102"
                className="text-2xl md:text-3xl hover:text-blue-500 transition-colors duration-300 p-2 -m-2"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/procontel_sb/"
                className="text-2xl md:text-3xl hover:text-pink-500 transition-colors duration-300 p-2 -m-2"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/573114678137"
                className="text-2xl md:text-3xl hover:text-green-500 transition-colors duration-300 p-2 -m-2"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Sección de Horarios */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
              <FaClock className="mr-2 text-accent-500" /> Horarios
            </h3>
            <div className="flex items-start mb-3">
              <FaClock className="mr-3 text-accent-500 text-lg mt-1 flex-shrink-0" />
              <div>
                <p className="text-base md:text-lg mb-1 text-gray-300">Lunes a Viernes</p>
                <p className="text-base md:text-lg text-gray-300">9:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-start mt-4">
              <FaMapMarkerAlt className="mr-3 text-accent-500 text-lg mt-1 flex-shrink-0" />
              <p className="text-base md:text-lg text-gray-300">Bogotá, Colombia</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Procontel SB. Todos los derechos reservados.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <a href="/terminos" className="hover:text-gray-300 transition-colors">
              Términos y Condiciones
            </a>
            <a href="/privacidad" className="hover:text-gray-300 transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
