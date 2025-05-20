/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["localhost", "via.placeholder.com", "i.ytimg.com", "img.youtube.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Asegurarnos de que solo se usen las páginas del directorio pages
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  // Optimización de construcción
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Directorio de salida
  distDir: ".next",
}

module.exports = nextConfig
