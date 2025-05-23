"use client"
import { motion } from "framer-motion"
import plansData from "./data/pricingPlans"
import clsx from "clsx"
import { useIsMobile } from "../hooks/useIsMobile"
import Link from "next/link"

interface Plan {
  name: string;
  price: string;
  billingCycle?: string; // Hacemos billingCycle opcional
  features: string[];
  popular?: boolean;
}

const Pricing = () => {
  const isMobile = useIsMobile()

  return (
    <section id="pricing" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Planes de Facturación</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4 md:mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          ¿Quieres adquirir un producto?
          Puedes realizar la gestión con nuestros asesores a través de correo electrónico o WhatsApp.
          Haz clic en el botón "Comenzar ahora" para asesoria. <span className="font-bold text-blue-600">GRATUITA</span> 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {plansData.map((plan: Plan, index) => (
            <motion.div
              key={plan.name}
              className={clsx(
                "relative p-6 md:p-8 rounded-2xl shadow-lg transition-all duration-300 h-full flex flex-col",
                plan.popular
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 transform lg:-translate-y-4"
                  : "bg-white border border-gray-200 hover:shadow-xl",
              )}
              whileHover={isMobile ? {} : { y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs md:text-sm font-bold px-3 md:px-4 py-1 rounded-full">
                  MÁS POPULAR
                </div>
              )}

              <div className="flex-grow">
                <h3
                  className={clsx(
                    "text-xl md:text-2xl font-bold mb-3 md:mb-4",
                    plan.popular ? "text-blue-800" : "text-gray-800",
                  )}
                >
                  {plan.name}
                </h3>

                <div className="mb-4 md:mb-6">
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.billingCycle && <span className="text-gray-500 ml-2">/{plan.billingCycle}</span>}
                </div>

                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className={clsx(
                          "flex-shrink-0 w-5 h-5 mt-0.5 mr-2 md:mr-3",
                          plan.popular ? "text-blue-600" : "text-green-500",
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className={plan.popular ? "text-gray-700" : "text-gray-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/contacto?plan=${encodeURIComponent(plan.name)}`} passHref legacyBehavior>
                <motion.button
                  whileHover={isMobile ? {} : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={clsx(
                    "w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-300 mt-auto",
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
                      : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
                  )}
                >
                  Comenzar ahora
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:mt-16 text-center text-gray-600">
          <p>
            ¿Necesitas un plan personalizado?{" "}
            <a href="/contacto" className="text-blue-600 hover:underline active:text-blue-800">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
