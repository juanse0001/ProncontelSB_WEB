"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useIsMobile } from "../hooks/useIsMobile"
import MobileNavigation from "./MobileNavigation"
import Logo from "./Logo"
import { FiHome, FiBriefcase, FiTag, FiUsers, FiBookOpen, FiMail, FiChevronDown, FiLogIn, FiExternalLink } from "react-icons/fi"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false)
  const router = useRouter()
  const { isMobile } = useIsMobile()

  const navItems = [
    { name: "Inicio", href: "/", icon: <FiHome className="w-5 h-5" /> },
    { name: "Servicios", href: "/#servicios", icon: <FiBriefcase className="w-5 h-5" /> },
    { name: "Planes", href: "/#pricing", icon: <FiTag className="w-5 h-5" /> },
    { name: "Nuestros Clientes", href: "/#Testimonios", icon: <FiUsers className="w-5 h-5" /> },
    { name: "Blog", href: "/blog", icon: <FiBookOpen className="w-5 h-5" /> },
    { name: "Contacto", href: "/contacto", icon: <FiMail className="w-5 h-5" /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-primary-50"}`}
    >
      <div className="container mx-auto px-3 py-3 md:py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Logo size={isMobile ? "sm" : "lg"} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              // Determine if this is the active page
              const isActive =
                item.href === router.pathname ||
                (item.href.includes("#") && router.pathname === "/" && router.asPath && router.asPath === item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive ? "text-secondary-500 font-medium" : "text-gray-700"
                  } hover:text-secondary-500 transition-colors duration-300`}
                >
                  {item.name}
                </Link>
              )
            })}
            
            {/* Botón de login con menú desplegable */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsLoginMenuOpen(!isLoginMenuOpen)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                <FiLogIn className="mr-2" />
                Acceso
                <FiChevronDown className={`ml-2 transition-transform duration-200 ${isLoginMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Menú desplegable */}
              {isLoginMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    href="/admin/login"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsLoginMenuOpen(false)}
                  >
                    <FiLogIn className="mr-2" />
                    Login Admin
                  </Link>
                  <a
                    href="https://www.luciesteban.com/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsLoginMenuOpen(false)}
                  >
                    <FiExternalLink className="mr-2" />
                    Ingresar al Sistema
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}

export default Header
