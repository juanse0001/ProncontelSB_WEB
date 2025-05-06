import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    className: "rounded-xl shadow-xl border border-gray-500",
  };

  const images = [
    { id: 1, src: '/assets/images/lluvia.jpg', alt: 'Imagen 1' },
    { id: 2, src: '/assets/images/PersonajePerzonalizado.jpg', alt: 'Imagen 2' },
    { id: 3, src: '/assets/images/Potente software contable ideal para pymes.jpg', alt: 'Imagen 3' },
    // Agrega más imágenes aquí con sus rutas correctas
  ];

  return (
    <div className="w-100 h-auto"> {/* Ajustamos el ancho del contenedor del Slider */}
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.src} alt={image.alt} className="w-full h-auto object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;