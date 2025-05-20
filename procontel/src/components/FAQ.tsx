// Remove this component as it's not being used in the main page
const FAQ = () => {
  return (
    <section id="faq" className="bg-gradient-to-r from-accent-100 to-primary-100 py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Contenido de texto */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ¡Simplificamos tu facturación electrónica!
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Facturación POS, plugin para WordPress, gestión de inventario y más.
          </p>
          <button className="bg-secondary-500 text-white px-8 py-3 rounded-xl hover:bg-secondary-600 transition-colors">
            Solicita tu demo gratuita
          </button>
        </div>

        {/* Imagen */}
        <div className="md:w-1/2 mt-12 md:mt-0">
          <img src="/placeholder.svg?key=q1658" alt="Sistema POS" className="rounded-xl shadow-lg" />
        </div>
      </div>
    </section>
  )
}

export default FAQ
