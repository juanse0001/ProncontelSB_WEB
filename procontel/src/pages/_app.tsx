"use client"

import type { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import "../styles/globals.css"
import LoadingSpinner from "../components/LoadingSpinner"
import BottomNavigation from "../components/BottomNavigation"
import { useIsMobile } from "../hooks/useIsMobile"
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isMobile } = useIsMobile()

  // Effect to handle route changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setIsLoading(false)
      // Scroll to top on route change
      window.scrollTo(0, 0)
    }

    const handleRouteChangeError = () => {
      setIsLoading(false)
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    router.events.on("routeChangeError", handleRouteChangeError)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
      router.events.off("routeChangeError", handleRouteChangeError)
    }
  }, [router.events])

  // Add viewport height fix for mobile browsers
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVh()
    window.addEventListener("resize", setVh)
    window.addEventListener("orientationchange", setVh)

    return () => {
      window.removeEventListener("resize", setVh)
      window.removeEventListener("orientationchange", setVh)
    }
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Procontel SB - Soluciones de Facturación Electrónica</title>
        <link rel="icon" href="/LogoFavIcon.png" sizes="any" />
      </Head>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Component {...pageProps} />
          {isMobile && <BottomNavigation />}
          <div className="pb-16 md:pb-0">
            {/* Extra padding at the bottom for mobile to account for bottom navigation */}
          </div>
          <Toaster position="top-right" />
        </>
      )}
    </SessionProvider>
  )
}

export default MyApp
