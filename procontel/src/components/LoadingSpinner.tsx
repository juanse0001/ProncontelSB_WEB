const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-red-600 animate-spin animate-pulse"></div>
      </div>
      <p className="ml-4 text-xl font-semibold text-gray-700">Cargando...</p>
    </div>
  )
}

export default LoadingSpinner
