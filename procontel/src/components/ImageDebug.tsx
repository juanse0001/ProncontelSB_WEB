"use client"
import { useState, useEffect } from "react"

const ImageDebug = () => {
  const [imageStatuses, setImageStatuses] = useState({})

  const imagesToCheck = [
    "/assets/images/Logo.jpg",
    "/assets/images/lluvia.jpg",
    "/assets/images/PersonajePerzonalizado.jpg",
    "/assets/images/Potente software contable ideal para pymes.jpg",
    "/assets/images/factura.jpg",
    "/assets/images/Clientess.png",
  ]

  useEffect(() => {
    const checkImages = async () => {
      const statuses = {}

      for (const src of imagesToCheck) {
        try {
          const response = await fetch(src, { method: "HEAD" })
          statuses[src] = response.ok ? "Available" : "Not found"
        } catch (error) {
          statuses[src] = `Error: ${error.message}`
        }
      }

      setImageStatuses(statuses)
    }

    checkImages()
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 z-50 text-xs overflow-auto max-h-40">
      <h3 className="font-bold mb-2">Image Debug Info:</h3>
      <ul>
        {Object.entries(imageStatuses).map(([src, status]) => (
          <li key={src}>
            {src}: <span className={status === "Available" ? "text-green-600" : "text-red-600"}>{status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ImageDebug
