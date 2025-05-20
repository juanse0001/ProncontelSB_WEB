"use client"

import { useState, useEffect } from "react"
import { getDeviceType, getViewportSize, getOrientation } from "../utils/deviceDetection"

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState({
    deviceType: "desktop" as const,
    viewportSize: { width: 1200, height: 800 },
    orientation: "landscape" as const,
  })

  useEffect(() => {
    // Function to check device and viewport
    const checkDevice = () => {
      const deviceType = getDeviceType()
      const viewportSize = getViewportSize()
      const orientation = getOrientation()

      setIsMobile(viewportSize.width < breakpoint)
      setDeviceInfo({
        deviceType,
        viewportSize,
        orientation,
      })
    }

    // Check initially
    checkDevice()

    // Add listeners for changes
    window.addEventListener("resize", checkDevice)
    window.addEventListener("orientationchange", checkDevice)

    // Clean up listeners
    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [breakpoint])

  return {
    isMobile,
    ...deviceInfo,
  }
}
