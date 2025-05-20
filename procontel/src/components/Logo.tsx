import type React from "react"
import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-12 w-auto",
    md: "h-16 w-auto",
    lg: "h-20 w-auto",
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/Logo.jpg"
        alt="Procontel SB Logo"
        width={size === "sm" ? 45 : size === "md" ? 54 : 70}
        height={size === "sm" ? 45 : size === "md" ? 54 : 70}
        className={sizeClasses[size]}
        priority
        quality={100}
      />
      <h1
        className={`ml-2 font-bold text-secondary-500 ${
          size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
        }`}
      >
        Procontel SB
      </h1>
    </div>
  )
}

export default Logo
