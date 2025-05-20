"use client"

import { useEffect, useRef } from "react"
import { useRouter } from 'next/router';
import { motion, useInView } from "framer-motion"; // Importar motion y useInView

const AboutUsPage = () => {
  const router = useRouter();

  // Eliminar el useEffect de IntersectionObserver existente
  // useEffect(() => { ... }, [])

  // Definir los colores de los iconos directamente en el mapa de Valores Fundamentales
  const primaryIconColor = "#C0392B"; // Rojo del logo
  const secondaryIconColor = "#2980B9"; // Azul del logo

  // Variantes de animación para las secciones
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Referencias para useInView para cada sección
  const historyRef = useRef(null);
  const historyInView = useInView(historyRef, { once: true, margin: "-100px 0px" });

  const missionVisionRef = useRef(null);
  const missionVisionInView = useInView(missionVisionRef, { once: true, margin: "-100px 0px" });

  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px 0px" });

  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px 0px" });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px 0px" });


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-4">
        <button
          onClick={() => router.push('/')}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold hover:bg-gray-400 transition"
        >
          &larr; Volver al Home
        </button>
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-b from-red-600 via-red-100 to-white overflow-hidden"> {/* Eliminado id="about" */}
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-16 md:space-y-20">
          {/* Nuestra Historia */}
          <motion.div // Usar motion.div
            ref={historyRef} // Asignar referencia
            variants={sectionVariants} // Asignar variantes
            initial="hidden"
            animate={historyInView ? "visible" : "hidden"} // Animar cuando está en vista
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center" // Eliminado animate-on-scroll
          >
            <div className="p-6 md:p-8 bg-white rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  En <span className="font-semibold text-red-600">PROCONTEL SB</span>, nuestra historia comenzó con la
                  visión de integrar soluciones tecnológicas innovadoras para empresas. Nos propusimos crear un puente
                  entre la complejidad tecnológica y la facilidad de uso.
                </p>
                <p className="leading-relaxed">
                  A lo largo de nuestra trayectoria, hemos cultivado un compromiso inquebrantable con la calidad y la
                  satisfacción del cliente, adaptándonos a los desafíos y abrazando las oportunidades que el panorama
                  tecnológico nos ha presentado.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-8 md:p-10 rounded-xl shadow-md">
              <div className="flex flex-col h-full justify-center">
                <p className="text-xl md:text-2xl font-medium mb-4">
                  "Conectando tecnología y soluciones para un futuro más eficiente."
                </p>
                <div className="flex items-center mt-auto">
                  <div className="bg-white/20 p-2 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l-4 16m-4-4l4-16m-4 4l4-16"
                      />
                    </svg>
                  </div>
                  <p className="text-sm opacity-90">Impulsando la transformación digital.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Misión y Visión */}
          <motion.div // Usar motion.div
            ref={missionVisionRef} // Asignar referencia
            variants={sectionVariants} // Asignar variantes
            initial="hidden"
            animate={missionVisionInView ? "visible" : "hidden"} // Animar cuando está en vista
            transition={{ duration: 0.6, delay: 0.2 }} // Añadir un ligero delay
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" // Eliminado animate-on-scroll
          >
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m14-4l-3-3m0 6l-3 3"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Nuestra Misión</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Nuestra misión es clara:{" "}
                <span className="font-medium text-gray-800">
                  proporcionar soluciones tecnológicas integrales y confiables
                </span>
                . Nos dedicamos a entender las necesidades de nuestros clientes y ofrecerles herramientas y servicios que
                impulsen su crecimiento y eficiencia operativa.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.006 0l3-9m-9 9h4m-4-2l2-2m-2 2l-2-2m-1-5v2m0 0l-2-2M9 17l2 2m-2-2l-2 2"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Nuestra Visión</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Visualizamos un futuro donde{" "}
                <span className="font-medium text-gray-800">
                  PROCONTEL SB sea reconocido como un socio estratégico clave en la transformación digital de las empresas
                  en Latinoamérica
                </span>
                . Aspiramos a ser líderes en la provisión de soluciones tecnológicas innovadoras y adaptadas a las
                necesidades cambiantes del mercado.
              </p>
            </div>
          </motion.div>

          {/* Nuestros Servicios */}
          <motion.div // Usar motion.div
            ref={servicesRef} // Asignar referencia
            variants={sectionVariants} // Asignar variantes
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"} // Animar cuando está en vista
            transition={{ duration: 0.6, delay: 0.3 }} // Añadir un ligero delay
            className="" // Eliminado animate-on-scroll
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Nuestros Servicios</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Soluciones tecnológicas diseñadas para impulsar tu éxito</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l-4 16m-4-4l4-16m-4 4l4-16"
                    />
                  </svg>
                ),
                title: "Consultoría IT",
                description: "Asesoramiento experto para optimizar tu infraestructura tecnológica.",
              }, {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v-2m6 2v-2M5 9h14l-2 10H7l-2-10z"
                    />
                  </svg>
                ),
                title: "Desarrollo de Software",
                description: "Soluciones de software a medida para tus necesidades específicas.",
              }, {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6-3-6-3-6 3 6 3z"
                    />
                  </svg>
                ),
                title: "Infraestructura en la Nube",
                description: "Servicios de cloud computing escalables y seguros.",
              },].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Valores Fundamentales */}
          <motion.div // Usar motion.div
            ref={valuesRef} // Asignar referencia
            variants={sectionVariants} // Asignar variantes
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"} // Animar cuando está en vista
            transition={{ duration: 0.6, delay: 0.4 }} // Añadir un ligero delay
            className="" // Eliminado animate-on-scroll
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Valores Fundamentales</h2>
              <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Los principios que guían cada decisión y acción que tomamos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={primaryIconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <polyline points="16 11 18 13 22 9"></polyline>
                  </svg>
                ),
                title: "Integridad",
                description:
                  "Actuamos con honestidad y transparencia en todo lo que hacemos, manteniendo los más altos estándares éticos.",
                color: "bg-red-500",
              }, {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={secondaryIconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                ),
                title: "Innovación",
                description:
                  "Buscamos constantemente nuevas formas de mejorar y crecer, adoptando tecnologías y métodos de vanguardia.",
                color: "bg-blue-500",
              }, {
                 icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={primaryIconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                ),
                title: "Excelencia",
                description:
                  "Nos esforzamos por la más alta calidad en cada proyecto, superando las expectativas en todo momento.",
                color: "bg-red-600",
              }, {
                 icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={secondaryIconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    <path d="M12 5 9 8"></path>
                    <path d="m14 17-2 2-2-2"></path>
                    <path d="M14 8c-.5-.5-1.5-.5-2 0"></path>
                    <path d="M17 11c.5.5.5 1.5 0 2"></path>
                    <path d="m10 14-2 2 2 2"></path>
                  </svg>
                ),
                title: "Compromiso",
                description:
                  "Dedicación total a nuestros clientes y su éxito, construyendo relaciones duraderas basadas en la confianza.",
                color: "bg-blue-600",
              },].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-200"
                >
                  <div className={`bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${value.color.includes('red') ? 'text-red-600' : 'text-blue-600'} group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Final */}
          <motion.div // Usar motion.div
            ref={ctaRef} // Asignar referencia
            variants={sectionVariants} // Asignar variantes
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"} // Animar cuando está en vista
            transition={{ duration: 0.6, delay: 0.5 }} // Añadir un ligero delay
            className="bg-white rounded-3xl shadow-xl p-12" // Eliminado animate-on-scroll
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{
                number: "10+",
                label: "Años de experiencia"
              }, {
                number: "200+",
                label: "Proyectos completados"
              }, {
                number: "50+",
                label: "Clientes satisfechos"
              }, {
                number: "15+",
                label: "Profesionales"
              },].map((stat, index) => (
                <div key={index} className="p-6">
                  <div className="text-4xl font-bold text-accent-600 mb-2">{stat.number}</div>
                  <div className="text-primary-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage; 