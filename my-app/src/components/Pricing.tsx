const Pricing = () => (
  <section id="pricing" className="py-16 bg-light-dark">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-dark text-center mb-8">Nuestros Planes</h2>
      <p className="text-center text-primary font-semibold mb-12">
        30 primeros usuarios acceden GRATIS al software limitado
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`p-8 rounded-xl shadow-soft ${
              plan.popular ? "bg-primary text-light" : "bg-light"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
            <p className="text-4xl font-bold mb-6">{plan.price}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={`w-full py-3 rounded-lg ${
                plan.popular 
                  ? "bg-light text-primary hover:bg-light/90" 
                  : "bg-primary text-white hover:bg-secondary"
              }`}
            >
              Comenzar ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    features: ["100 transacciones/mes", "Soporte básico", "1 usuario"],
  },
  {
    name: "Profesional",
    price: "$49/mes",
    features: ["Transacciones ilimitadas", "Soporte prioritario", "5 usuarios"],
    popular: true,
  },
  {
    name: "Empresarial",
    price: "$99/mes",
    features: ["Transacciones ilimitadas", "Soporte 24/7", "Usuarios ilimitados"],
  },
];

export default Pricing;