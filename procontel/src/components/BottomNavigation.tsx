"use client"

import type React from "react"

import { useRouter } from "next/router"
import Link from "next/link"
import { FiHome, FiBriefcase, FiTag, FiUsers, FiBookOpen } from "react-icons/fi"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

const BottomNavigation: React.FC = () => {
  const router = useRouter()

  const navItems: NavItem[] = [
    { name: "Inicio", href: "/", icon: <FiHome className="w-5 h-5" /> },
    { name: "Servicios", href: "/#servicios", icon: <FiBriefcase className="w-5 h-5" /> },
    { name: "Planes", href: "/#pricing", icon: <FiTag className="w-5 h-5" /> },
    { name: "Clientes", href: "/#Testimonios", icon: <FiUsers className="w-5 h-5" /> },
    { name: "Blog", href: "/blog", icon: <FiBookOpen className="w-5 h-5" /> },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive =
            item.href === router.pathname ||
            (item.href.includes("#") && router.pathname === "/" && router.asPath && router.asPath === item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <div className="flex items-center justify-center">{item.icon}</div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
