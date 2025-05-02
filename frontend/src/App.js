import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

// Páginas
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Helmet>
        <title>SYCA SPA | Servicios de Electricidad</title>
        <meta name="description" content="SYCA SPA - Servicios de electricidad automotriz, domiciliaria, reparación de fallas, instalación de accesorios y automatización" />
        <meta name="keywords" content="electricidad automotriz, electricidad domiciliaria, reparación fallas eléctricas, instalación accesorios, automatización" />
      </Helmet>
      
      <ScrollToTop />
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/servicios/:id" element={<ServiceDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </>
  );
}

export default App;