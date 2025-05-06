import React from 'react';
import { motion } from 'framer-motion';
import plans from './data/pricingPlans'; // Asegúrate de que la ruta sea correcta
import clsx from 'clsx';

const Pricing = () => (
  <section id="pricing" className="py-16 bg-primary-50"> {/* Fondo general más suave */}
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Nuestros Planes</h2>
      <p className="text-center text-gray-600 font-semibold mb-12">
        Los 30 primeros usuarios acceden <span className="font-bold text-accent-500">GRATIS</span> al software limitado
      </p>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            className={clsx(
              'p-6 rounded-xl shadow-md transition-all duration-300', // Sombra más sutil por defecto
              plan.popular
                ? 'bg-secondary-100 border-4 border-secondary-300 shadow-lg' // Fondo y borde destacado para el popular
                : 'bg-white border border-gray-200 hover:shadow-lg' // Fondo blanco con borde sutil
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-xl font-semibold text-primary-800 mb-4">{plan.name}</h3> {/* Texto primario más oscuro */}
            <p className="text-3xl font-bold text-secondary-500 mb-6"> {/* Precio en el color secundario */}
              {plan.price}
            </p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className={clsx(plan.popular ? 'text-secondary-500' : 'text-accent-500', 'mr-2')}>✓</span> {/* Checkmark en acento o secundario */}
                  <span className={plan.popular ? 'text-primary-700' : 'text-gray-700'}>{feature}</span> {/* Texto de la característica */}
                </li>
              ))}
            </ul>
            <button
              className={clsx(
                'w-full py-3 rounded-full transition-colors duration-300 font-semibold',
                plan.popular
                  ? 'bg-accent-500 text-white hover:bg-accent-600' // Botón del plan popular en acento
                  : 'bg-primary-500 text-white hover:bg-primary-600' // Botón de los otros planes en primario
              )}
            >
              Comenzar ahora
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;