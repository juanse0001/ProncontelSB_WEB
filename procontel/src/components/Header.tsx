"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useIsMobile } from "../hooks/useIsMobile"
import MobileNavigation from "./MobileNavigation"
import Logo from "./Logo"
import { FiHome, FiBriefcase, FiTag, FiUsers, FiBookOpen, FiMail } from "react-icons/fi"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
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
            {/* Botón de login admin */}
            <Link href="/admin/login" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition hidden md:inline-block">
              Login
            </Link>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}

export default Header
