"use client"

import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaYoutube, FaCalendarAlt, FaEye } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"
import { useIsMobile } from "../hooks/useIsMobile"
// Añadir el botón flotante a la página de blog
import FloatingActionButton from "../components/FloatingActionButton"

// Datos de los videos de YouTube
const novedadesVideos = [
  {
    id: "YbkEwSS1xcI",
    title: "Facturación Electrónica: Lo que debes saber",
    description:
      "Aprende los conceptos básicos de la facturación electrónica en Colombia y cómo implementarla en tu negocio.",
    date: "15 de mayo, 2023",
    views: "1.2K",
    type: "short" as const,
  },
  {
    id: "Uw_UAuLzXGw",
    title: "Novedades en Facturación Electrónica 2024",
    description: "Descubre las últimas actualizaciones y cambios en la normativa de facturación electrónica para este año.",
    date: "1 de marzo, 2024",
    views: "2.5K",
    type: "short" as const,
  }
];

const tutorialesVideos = [
  {
    id: "ylNgVwY_ZbM",
    title: "Cómo generar facturas tipo POS en el sistema Procontel paso a paso",
    description: "Guía paso a paso para configurar correctamente tu sistema de punto de venta con nuestro software.",
    date: "3 de abril, 2023",
    views: "3.5K",
    type: "video" as const,
  },
  {
    id: "HnSYAaLFYuw",
    title: "Cómo generar una factura electrónica en el sistema Propontel SB paso a paso",
    description: "Actualización sobre los cambios recientes en la normativa de la DIAN para facturación electrónica.",
    date: "20 de marzo, 2023",
    views: "2.8K",
    type: "video" as const,
  },
  {
    id: "qEfkdezsYlI",
    title: "Cómo consultar facturas electrónicas en nuestro sistema Procontel paso a paso",
    description: "Descubre cómo la nómina electrónica puede simplificar la gestión de recursos humanos en tu empresa.",
    date: "5 de febrero, 2023",
    views: "1.7K",
    type: "video" as const,
  }
];

const quienesSomosVideos = [
  // Plantillas para futuros videos
  {
    id: "placeholder1",
    title: "Nuestra Historia",
    description: "Conoce la historia detrás de Procontel y cómo nos convertimos en líderes en facturación electrónica.",
    date: "Próximamente",
    views: "0",
    type: "video" as const,
  },
  {
    id: "placeholder2",
    title: "Nuestro Equipo",
    description: "Presentamos al equipo de expertos que hace posible la excelencia en nuestro servicio.",
    date: "Próximamente",
    views: "0",
    type: "video" as const,
  }
];

interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  views: string;
  type: "short" | "video";
}

// Componente para mostrar un video de YouTube
const VideoCard = ({ video }: { video: Video }) => {
  const isShort = video.type === "short"
  const videoUrl = isShort
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`
  const isMobile = useIsMobile()

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:shadow-md">
      <div className="relative">
        <div className={`aspect-w-16 aspect-h-9 ${isShort ? "h-64 md:h-80" : "h-40 md:h-48"}`}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}${isShort ? "?loop=1&controls=0&rel=0" : ""}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </div>
        {isShort && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">Short</div>
        )}
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-bold text-base md:text-lg mb-2 text-gray-800 line-clamp-2">{video.title}</h3>
        <p className="text-gray-600 text-sm mb-3 md:mb-4 line-clamp-3">{video.description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            <span>{video.date}</span>
          </div>
          <div className="flex items-center">
            <FaEye className="mr-1" />
            <span>{video.views} visualizaciones</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para la sección de YouTube embebido
const YouTubeEmbed = ({ videoId, isShort = false }: { videoId: string; isShort?: boolean }) => {
  const embedUrl = isShort
    ? `https://www.youtube.com/embed/${videoId}?loop=1&controls=0&rel=0`
    : `https://www.youtube.com/embed/${videoId}`
  const isMobile = useIsMobile()

  return (
    <div className={`aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg ${isMobile ? "h-64" : ""}`}>
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default function Blog() {
  const [activeSection, setActiveSection] = useState("novedades")
  const isMobile = useIsMobile()

  // Obtener videos según la sección activa
  const getActiveVideos = () => {
    switch (activeSection) {
      case "novedades":
        return novedadesVideos;
      case "tutoriales":
        return tutorialesVideos;
      case "quienesSomos":
        return quienesSomosVideos;
      default:
        return novedadesVideos;
    }
  }

  return (
    <>
      <Head>
        <title>Blog - Procontel SB</title>
        <meta
          name="description"
          content="Blog de Procontel SB con tutoriales, noticias y actualizaciones sobre facturación electrónica"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-20 md:pt-24 pb-12 md:pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Nuestro Blog</h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4 md:mb-6"></div>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                Tutoriales, noticias y actualizaciones sobre facturación electrónica y nuestros servicios
              </p>
            </div>

            {/* Navegación de secciones */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    activeSection === "novedades"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                  onClick={() => setActiveSection("novedades")}
                >
                  Novedades
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeSection === "tutoriales"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                  onClick={() => setActiveSection("tutoriales")}
                >
                  Cómo usar nuestro sistema
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    activeSection === "quienesSomos"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                  onClick={() => setActiveSection("quienesSomos")}
                >
                  Quiénes somos
                </button>
              </div>
            </div>

            {/* Lista de videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {getActiveVideos().map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 md:mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 md:p-8 text-center text-white shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">¿Quieres aprender más?</h2>
              <p className="mb-5 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Suscríbete a nuestro canal de YouTube para recibir notificaciones sobre nuevos tutoriales y
                actualizaciones.
              </p>
              <a
                href="https://www.youtube.com/@procontelsb"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg inline-flex items-center justify-center transition-colors transform hover:scale-105 active:scale-95"
              >
                <FaYoutube className="mr-2 text-lg md:text-xl" /> Suscribirse
              </a>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingActionButton />
      </div>
    </>
  )
}
