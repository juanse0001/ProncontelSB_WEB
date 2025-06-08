"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import { useIsMobile } from "../hooks/useIsMobile"

// Añadir el botón flotante a la página de contacto
import FloatingActionButton from "../components/FloatingActionButton"

// Tipos para los datos del formulario y errores
interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
}

type FormErrors = Partial<Record<keyof FormData, string>> & { submit?: string };

// Definir la URL base de la API usando la variable de entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

export default function Contacto() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Efecto para leer el parámetro 'plan' de la URL y pre-llenar el mensaje
  useEffect(() => {
    if (router.query.plan) {
      const planName = Array.isArray(router.query.plan)
        ? router.query.plan[0]
        : router.query.plan;
      setFormData(prev => ({
        ...prev,
        mensaje: `Me interesa el plan ${planName}. Por favor, cuéntenme más detalles.`
      }));
    }
  }, [router.query.plan]); // Dependencia: re-ejecutar si el parámetro plan cambia en la URL

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    // Validar mensaje
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje')
      }

      setSubmitSuccess(true)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        mensaje: "",
      })

      // Redireccionar después de 3 segundos
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error)
      setErrors({
        submit: error.message || 'Error al enviar el mensaje. Por favor, intente nuevamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contacto - Procontel SB</title>
        <meta
          name="description"
          content="Contáctanos para obtener más información sobre nuestros servicios de facturación electrónica"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-20 md:pt-24 pb-12 md:pb-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Contáctanos</h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4 md:mb-6"></div>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                Estamos aquí para responder tus preguntas y ayudarte con nuestras soluciones de facturación electrónica
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Información de contacto */}
              <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6 md:p-8 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Información de Contacto</h2>

                <div className="space-y-5 md:space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-500 bg-opacity-30 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-base md:text-lg mb-1">Teléfono</h3>
                      <a href="https://wa.me/573114678137" className="hover:underline active:text-blue-200">
                        +57 311 4678137
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-500 bg-opacity-30 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-base md:text-lg mb-1">Email</h3>
                      <a
                        href="mailto:procontelsb1@gmail.com"
                        className="hover:underline active:text-blue-200 break-all"
                      >
                        procontelsb1@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-500 bg-opacity-30 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-base md:text-lg mb-1">Ubicación</h3>
                      <p>Bogotá, Colombia</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-500 bg-opacity-30 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-base md:text-lg mb-1">Horario</h3>
                      <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 md:mt-10">
                  <h3 className="font-medium text-base md:text-lg mb-3 md:mb-4">Síguenos</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61569872082102"
                      className="bg-blue-500 bg-opacity-30 p-2 md:p-3 rounded-lg hover:bg-opacity-50 transition-all"
                      aria-label="Facebook"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/procontel_sb/"
                      className="bg-blue-500 bg-opacity-30 p-2 md:p-3 rounded-lg hover:bg-opacity-50 transition-all"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Formulario de contacto */}
              <div className="md:col-span-2 bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
                {submitSuccess ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="bg-green-100 text-green-700 p-3 md:p-4 rounded-lg mb-4 md:mb-6 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mensaje enviado con éxito</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                      ¡Gracias por contactarnos!
                    </h3>
                    <p className="text-gray-600 mb-4 md:mb-6">
                      Hemos recibido tu mensaje y te responderemos a la brevedad posible.
                    </p>
                    <p className="text-gray-500 text-sm">Serás redirigido a la página principal en unos segundos...</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Envíanos un mensaje</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre completo <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={`w-full px-3 md:px-4 py-2 border ${
                              errors.nombre ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                            placeholder="Tu nombre"
                          />
                          {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 md:px-4 py-2 border ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                            placeholder="tu@email.com"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Tu número de teléfono"
                          />
                        </div>

                        <div>
                          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                            Empresa
                          </label>
                          <input
                            type="text"
                            id="empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                          Mensaje <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          rows={isMobile ? 4 : 5}
                          className={`w-full px-3 md:px-4 py-2 border ${
                            errors.mensaje ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                          placeholder="¿En qué podemos ayudarte?"
                        ></textarea>
                        {errors.mensaje && <p className="mt-1 text-sm text-red-500">{errors.mensaje}</p>}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2 px-5 md:py-2 md:px-6 rounded-lg transition-colors duration-300 flex items-center disabled:opacity-70 transform hover:scale-105 active:scale-95"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Enviando...
                            </>
                          ) : (
                            "Enviar mensaje"
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Mapa o ubicación */}
            <div className="mt-10 md:mt-16 bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
                Nuestra ubicación
              </h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.39280650613!2d-74.24789006415204!3d4.648625932726193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoSwgQ29sb21iaWE!5e0!3m2!1ses!2s!4v1715634000000!5m2!1ses!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Procontel SB"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingActionButton />
      </div>
    </>
  )
}
