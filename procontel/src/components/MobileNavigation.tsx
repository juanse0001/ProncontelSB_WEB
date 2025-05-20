"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiMenu, FiX, FiHome, FiBriefcase, FiTag, FiUsers, FiBookOpen, FiMail, FiPhone } from "react-icons/fi"
import Logo from "./Logo"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)

  const navItems: NavItem[] = [
    { name: "Inicio", href: "/", icon: <FiHome className="w-5 h-5" /> },
    { name: "Servicios", href: "/#servicios", icon: <FiBriefcase className="w-5 h-5" /> },
    { name: "Planes", href: "/#pricing", icon: <FiTag className="w-5 h-5" /> },
    { name: "Clientes", href: "/#Testimonios", icon: <FiUsers className="w-5 h-5" /> },
    { name: "Blog", href: "/blog", icon: <FiBookOpen className="w-5 h-5" /> },
    { name: "Contacto", href: "/contacto", icon: <FiMail className="w-5 h-5" /> },
  ]

  useEffect(() => {
    // Set active item based on current route
    const currentPath = router.pathname || ""
    const currentHash = router.asPath && router.asPath.includes("#") ? router.asPath.split("#")[1] : ""

    const activeNav = navItems.find((item) => {
      if (item.href.includes("#")) {
        return currentHash && item.href.includes(currentHash)
      }
      return item.href === currentPath
    })

    setActiveItem(activeNav?.name || null)

    // Close menu on route change
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    if (router.events) {
      router.events.on("routeChangeComplete", handleRouteChange)

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange)
      }
    }

    return () => {} // Retorno vacío si router.events no existe
  }, [router.pathname, router.asPath, router.events])

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div className="md:hidden" ref={navRef}>
      {/* Toggle button */}
      <button
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-95 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Logo size="sm" />
            </Link>
            <button
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = item.name === activeItem

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={`mr-3 ${isActive ? "text-blue-600" : "text-gray-500"}`}>{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <a
              href="tel:+573114678137"
              className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              <FiPhone className="mr-2" />
              <span>Llamar ahora</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNavigation
