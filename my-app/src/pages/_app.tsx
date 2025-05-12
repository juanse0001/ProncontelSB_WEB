import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import AboutUs from '../components/AboutUs'; // Importa la sección "Acerca de Nosotros"
import '../styles/globals.css';

const App = () => {
  return (
    <div className="app bg-primary-500"> {/* Aplicamos el color de fondo principal al contenedor de la aplicación */}
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Pricing />  
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default App;