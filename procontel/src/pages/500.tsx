"use client"

import Head from "next/head"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Error del servidor | Procontel SB</title>
        <meta name="description" content="Ha ocurrido un error en el servidor. Por favor, intenta más tarde." />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow flex items-center justify-center py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">500</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Error del servidor</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Lo sentimos, ha ocurrido un error en el servidor. Estamos trabajando para solucionarlo lo antes posible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Recargar página
              </button>
              <Link
                href="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg transition-colors inline-block"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
