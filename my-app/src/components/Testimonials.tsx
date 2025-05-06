const testimonials = [
  {
    text: "El mejor sistema de facturación que hemos usado. ¡Altamente recomendado!",
    author: "Juan Pérez - Tienda XYZ",
  },
  {
    text: "La implementación fue sencilla y el soporte excelente.",
    author: "María Gómez - Restaurante ABC",
  },
];

const Testimonials = () => (
  <section className="py-16 bg-light">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-dark text-center mb-12">Lo que dicen nuestros clientes</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="p-8 bg-light-dark rounded-xl border-l-4 border-primary shadow-soft"
          >
            <p className="text-dark-light mb-4">"{testimonial.text}"</p>
            <p className="font-semibold text-dark">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;