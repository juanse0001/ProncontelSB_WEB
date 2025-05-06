const Hero = () => (
  <section id="home" className="pt-24 pb-12 bg-gradient-to-r from-accent/10 to-primary/10">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
          ¡Simplificamos tu facturación electrónica!
        </h1>
        <p className="text-lg text-dark-light mb-8">
          Facturación POS, plugin para WordPress, gestión de inventario y más.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-secondary transition-colors">
          Solicita tu demo gratuita
        </button>
      </div>
      <div className="md:w-1/2 mt-12 md:mt-0">
        <img 
          src="/images/pos-system.png" 
          alt="Sistema POS" 
          className="rounded-xl shadow-soft"
        />
      </div>
    </div>
  </section>
);

export default Hero;