import Head from "next/head"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Página no encontrada | Procontel SB</title>
        <meta name="description" content="La página que estás buscando no existe o ha sido movida." />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow flex items-center justify-center py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Página no encontrada</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors inline-block"
              >
                Volver al inicio
              </Link>
              <Link
                href="/contacto"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg transition-colors inline-block"
              >
                Contactar soporte
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
