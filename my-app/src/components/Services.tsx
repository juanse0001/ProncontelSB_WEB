const services = [
  { icon: '📄', title: 'Facturación electrónica', description: 'Emisión y gestión de documentos electrónicos' },
  { icon: '💻', title: 'POS para ventas físicas', description: 'Sistema integrado punto de venta' },
  { icon: '👥', title: 'Nómina electrónica', description: 'Gestión completa de nómina digital' },
  { icon: '📑', title: 'Documentos soporte', description: 'Administración de documentos legales' },
  { icon: '📦', title: 'Gestión de inventario', description: 'Control en tiempo real de stock' },
  { icon: '📊', title: 'Informes y reportes', description: 'Generación automática de análisis' },
];

const Services = () => (
  <section id="services" className="py-16 bg-light">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-dark text-center mb-12">¿Qué incluye nuestro sistema?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.title}
            className="p-6 bg-light rounded-xl shadow-soft hover:shadow-hover transition-shadow"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-dark mb-2">{service.title}</h3>
            <p className="text-dark-light">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;