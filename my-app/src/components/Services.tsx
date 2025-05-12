import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';

const servicios = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Facturación electrónica',
    description: 'Emisión y gestión de documentos electrónicos con validación DIAN',
    link: '/facturacion-electronica',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'POS Integrado',
    description: 'Sistema punto de venta con sincronización en tiempo real',
    link: '/pos-integrado',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Nómina electrónica',
    description: 'Gestión automatizada de liquidación y pagos',
    link: '/nomina-electronica',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Documentos soporte',
    description: 'Administración de facturas, notas crédito y débito',
    link: '/documentos-soporte',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Gestión de inventario',
    description: 'Control preciso con alertas de stock mínimo',
    link: '/inventario',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Analítica avanzada',
    description: 'Reportes personalizados y dashboards interactivos',
    link: '/analitica-avanzada',
  },
];

const CarruselDeServicios = () => {
  const router = useRouter();
  const sliderRef = useRef(null);

  const ajustes = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '100px',
    arrows: true,
    className: "custom-slick-carousel",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '60px',
          variableWidth: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '30px',
          variableWidth: false,
        },
      },
    ],
  };

  const manejarIrAInventario = () => {
    router.push('/nuevo-componente-inventario');
  };

  return (
    <div className="relative pb-12">
      <Slider ref={sliderRef} {...ajustes}>
        {servicios.map((servicio, index) => (
          <div key={index} className="px-4 focus:outline-none">
            <div className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
              <div className="p-8 text-center flex-grow">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {servicio.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{servicio.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{servicio.description}</p>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                {servicio.title === 'Gestión de inventario' ? (
                  <button
                    onClick={manejarIrAInventario}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-300"
                  >
                    Pruébalo 100% gratis
                  </button>
                ) : (
                  <a
                    href={servicio.link}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium focus:outline-none transition-colors duration-300 inline-flex items-center"
                  >
                    Ver más detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SeccionDeServicios = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up', 'animate-on-scroll');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section id="servicios" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Nuestros Servicios
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestras soluciones diseñadas para optimizar tu facturación electrónica
          </p>
        </div>
        
        <CarruselDeServicios />

        {/* Sección CTA con animaciones */}
        <div 
          ref={ctaRef}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 md:p-10 text-center shadow-xl mt-12 opacity-0 transition-opacity duration-500"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para simplificar tu facturación?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Descubre cómo nuestra solución puede transformar la gestión financiera de tu negocio.
          </p>
          <button 
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md hover:scale-105 transform"
            onClick={() => window.location.href = '/contacto'}
          >
            Solicita tu demo gratuita
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default SeccionDeServicios;