import React from 'react';

const services = [
  {
    icon: '📄',
    title: 'Facturación electrónica',
    description: 'Emisión y gestión de documentos electrónicos con validación DIAN'
  },
  {
    icon: '💻',
    title: 'POS Integrado',
    description: 'Sistema punto de venta con sincronización en tiempo real'
  },
  {
    icon: '👥',
    title: 'Nómina electrónica',
    description: 'Gestión automatizada de liquidación y pagos'
  },
  {
    icon: '📑',
    title: 'Documentos soporte',
    description: 'Administración de facturas, notas crédito y débito'
  },
  {
    icon: '📦',
    title: 'Gestión de inventario',
    description: 'Control preciso con alertas de stock mínimo'
  },
  {
    icon: '📊',
    title: 'Analítica avanzada',
    description: 'Reportes personalizados y dashboards interactivos'
  },
];

const Services = () => (
  <section id="servicios" className="py-20 bg-secondary-50"> {/* Fondo en un tono muy claro del secundario */}
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-secondary-500 mb-4"> {/* Título principal completamente en rojo */}
          Nuestras Soluciones Integrales
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Tecnología avanzada para optimizar tus procesos empresariales
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            <div className="p-8">
              <div className="mb-6">
                <span className="text-5xl text-accent-500">{service.icon}</span> {/* Icono en el color de acento */}
              </div>
              <h3 className="text-2xl font-semibold text-primary-800 mb-4"> {/* Título del servicio en un tono oscuro del primario */}
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Efecto hover con el color secundario */}
            <div className="absolute inset-0 border-2 border-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Llamado a la acción con el color secundario */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 text-lg mb-4">
          ¿Necesitas una solución personalizada?
        </p>
        <button className="bg-accent-500 text-white px-8 py-3 rounded-xl hover:bg-accent-600 transition-colors duration-300 shadow-lg">
          Solicitar demostración
        </button>
      </div>
    </div>
  </section>
);

export default Services;