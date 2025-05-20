"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getOrientation } from "../utils/deviceDetection"

interface OrientationHandlerProps {
  children: React.ReactNode
  portraitOnly?: boolean
  message?: string
}

const OrientationHandler: React.FC<OrientationHandlerProps> = ({
  children,
  portraitOnly = false,
  message = "Please rotate your device for the best experience",
}) => {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    typeof window !== "undefined" ? getOrientation() : "portrait",
  )

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(getOrientation())
    }

    window.addEventListener("resize", handleOrientationChange)
    window.addEventListener("orientationchange", handleOrientationChange)

    return () => {
      window.removeEventListener("resize", handleOrientationChange)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [])

  // If portraitOnly is true and orientation is landscape, show message
  if (portraitOnly && orientation === "landscape") {
    return (
      <div className="fixed inset-0 bg-blue-900 text-white flex flex-col items-center justify-center z-50 p-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
        <h2 className="text-xl font-bold mb-2">Rotate Your Device</h2>
        <p>{message}</p>
      </div>
    )
  }

  return <>{children}</>
}

export default OrientationHandler
