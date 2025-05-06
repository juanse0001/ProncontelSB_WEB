import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';

const services = [
  {
    icon: '📄',
    title: 'Facturación electrónica',
    description: 'Emisión y gestión de documentos electrónicos con validación DIAN',
    link: '/facturacion-electronica',
  },
  {
    icon: '💻',
    title: 'POS Integrado',
    description: 'Sistema punto de venta con sincronización en tiempo real',
    link: '/pos-integrado',
  },
  {
    icon: '👥',
    title: 'Nómina electrónica',
    description: 'Gestión automatizada de liquidación y pagos',
    link: '/nomina-electronica',
  },
  {
    icon: '📑',
    title: 'Documentos soporte',
    description: 'Administración de facturas, notas crédito y débito',
    link: '/documentos-soporte',
  },
  {
    icon: '📦',
    title: 'Gestión de inventario',
    description: 'Control preciso con alertas de stock mínimo',
    link: '/inventario',
  },
  {
    icon: '📊',
    title: 'Analítica avanzada',
    description: 'Reportes personalizados y dashboards interactivos',
    link: '/analitica-avanzada',
  },
];

const ServicesCarousel = () => {
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    arrows: true,
    variableWidth: true,
    className: "custom-slick-carousel",
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '30px',
        },
      },
    ],
  };

  const handleGoToInventory = () => {
    router.push('/nuevo-componente-inventario');
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index} className="w-80 md:w-96 px-4 focus:outline-none">
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden service-card">
              <div className="p-8 text-center">
                <div className="mb-6">
                  <span className="text-5xl text-accent-500">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
              </div>
              {service.title === 'Gestión de inventario' && (
                <div className="p-4 bg-gray-100 border-t border-gray-200 text-center">
                  <button
                    onClick={handleGoToInventory}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm focus:outline-none"
                  >
                    Ir a Inventario
                  </button>
                </div>
              )}
              {service.title !== 'Gestión de inventario' && service.link && (
                <div className="p-4 bg-gray-100 border-t border-gray-200 text-center">
                  <a
                    href={service.link}
                    className="text-accent-500 hover:text-accent-600 text-sm focus:outline-none"
                  >
                    Ver más
                  </a>
                </div>
              )}
              <div className="absolute inset-0 border-2 border-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const ServicesSection = () => (
  <section id="servicios" className="py-20 bg-secondary-50">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-secondary-500 mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora nuestras soluciones diseñadas para tu crecimiento.
        </p>
      </div>
      <ServicesCarousel />
    </div>
  </section>
);

export default ServicesSection;