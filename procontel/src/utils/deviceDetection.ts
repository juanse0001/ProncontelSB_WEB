export type DeviceType = "mobile" | "tablet" | "desktop"

export function getDeviceType(): DeviceType {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "desktop" // Default for SSR
  }

  const ua = navigator.userAgent

  // Check for tablets first (some tablets report as both mobile and tablet)
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet"
  }

  // Check for mobile devices
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile"
  }

  return "desktop"
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") {
    return false // Default for SSR
  }

  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
}

export function getViewportSize() {
  if (typeof window === "undefined") {
    return { width: 1200, height: 800 } // Default for SSR
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export function getOrientation() {
  if (typeof window === "undefined") {
    return "landscape" // Default for SSR
  }

  return window.innerWidth > window.innerHeight ? "landscape" : "portrait"
}
