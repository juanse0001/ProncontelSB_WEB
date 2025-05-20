export interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

export function initPerformanceMonitoring(callback?: (metrics: PerformanceMetrics) => void): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return
  }

  const metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  }

  // First Contentful Paint
  try {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const fcp = entries[0]
        metrics.fcp = fcp.startTime
        if (callback) callback(metrics)
      }
    }).observe({ type: "paint", buffered: true })
  } catch (e) {
    console.error("FCP monitoring error:", e)
  }

  // Largest Contentful Paint
  try {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      metrics.lcp = lastEntry.startTime
      if (callback) callback(metrics)
    }).observe({ type: "largest-contentful-paint", buffered: true })
  } catch (e) {
    console.error("LCP monitoring error:", e)
  }

  // First Input Delay
  try {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const firstInput = entries[0]
        metrics.fid = firstInput.processingStart - firstInput.startTime
        if (callback) callback(metrics)
      }
    }).observe({ type: "first-input", buffered: true })
  } catch (e) {
    console.error("FID monitoring error:", e)
  }

  // Cumulative Layout Shift
  try {
    let clsValue = 0
    let clsEntries: PerformanceEntry[] = []

    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()

      entries.forEach((entry) => {
        // Only count layout shifts without recent user input
        if (!(entry as any).hadRecentInput) {
          const firstSessionEntry = clsEntries.length === 0
          const entrySameSession =
            clsEntries.length >= 1 &&
            (entry as PerformanceEntry).startTime - clsEntries[clsEntries.length - 1].startTime < 1000 &&
            (entry as PerformanceEntry).startTime - clsEntries[0].startTime < 5000

          if (firstSessionEntry || entrySameSession) {
            clsEntries.push(entry)
          } else {
            clsEntries = [entry]
          }

          // Calculate CLS value
          let clsValueTemp = 0
          clsEntries.forEach((entry) => {
            clsValueTemp += (entry as any).value
          })

          if (clsValueTemp > clsValue) {
            clsValue = clsValueTemp
            metrics.cls = clsValue
            if (callback) callback(metrics)
          }
        }
      })
    }).observe({ type: "layout-shift", buffered: true })
  } catch (e) {
    console.error("CLS monitoring error:", e)
  }

  // Time to First Byte (using Navigation Timing API)
  try {
    if (performance.getEntriesByType) {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navEntry) {
        metrics.ttfb = navEntry.responseStart
        if (callback) callback(metrics)
      }
    }
  } catch (e) {
    console.error("TTFB monitoring error:", e)
  }
}

// Function to log performance metrics
export function logPerformanceMetrics(metrics: PerformanceMetrics): void {
  console.log("Performance Metrics:", {
    "First Contentful Paint (FCP)": metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : "Not available",
    "Largest Contentful Paint (LCP)": metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : "Not available",
    "First Input Delay (FID)": metrics.fid ? `${metrics.fid.toFixed(2)}ms` : "Not available",
    "Cumulative Layout Shift (CLS)": metrics.cls !== null ? metrics.cls.toFixed(3) : "Not available",
    "Time to First Byte (TTFB)": metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : "Not available",
  })
}
