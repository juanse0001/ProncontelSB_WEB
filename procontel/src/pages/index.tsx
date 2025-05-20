"use client"

import Head from "next/head"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Pricing from "../components/Pricing"
import Testimonials from "../components/Testimonials"
import AboutUs from "../components/AboutUs"
import Footer from "../components/Footer"
import FloatingActionButton from "../components/FloatingActionButton"
import { useEffect } from "react"

export default function Home() {
  // Efecto para registrar que la página se ha cargado correctamente
  useEffect(() => {
    console.log("Home page loaded successfully")
  }, [])

  return (
    <>
      <Head>
        <title>Procontel SB - Soluciones de Facturación Electrónica</title>
        <meta name="description" content="Soluciones de facturación electrónica para empresas en Colombia" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Services />
          <Testimonials />
          <Pricing />
          
        </main>
        <Footer />
        <FloatingActionButton />
      </div>
    </>
  )
}
