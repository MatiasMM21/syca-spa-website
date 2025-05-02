import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { FaCar, FaHome, FaTools, FaPlug, FaRobot } from 'react-icons/fa';

// Componentes de estilos
const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('/images/services-header.png') no-repeat center center/cover;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  span {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeaderDescription = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
  }
`;

const ServicesSection = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  
  span {
    color: var(--primary-color);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(Link)`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  color: #333;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    
    .card-image {
      transform: scale(1.1);
    }
  }
`;

const CardImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ReadMoreButton = styled.span`
  color: var(--primary-color);
  font-weight: 500;
  margin-top: auto;
  align-self: flex-start;
  
  &::after {
    content: ' →';
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  p {
    font-size: 1.2rem;
    color: #e55c00;
  }
`;

// Página de servicios
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Iconos para cada servicio
  const serviceIcons = {
    1: <FaCar />,
    2: <FaHome />,
    3: <FaTools />,
    4: <FaPlug />,
    5: <FaRobot />
  };
  
  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServices(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los servicios. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
        console.error('Error fetching services:', err);
      }
    };
    
    // Simulamos la carga de datos ya que no tenemos el backend activo aún
    setTimeout(() => {
      // Datos mockup para los servicios (esto vendría del backend)
      const mockServices = [
        { 
          id: 1, 
          title: 'Electricidad Automotriz', 
          description: 'Servicios completos de diagnóstico y reparación de sistemas eléctricos para todo tipo de vehículos.', 
          image: '/images/auto-electric.png'
        },
        { 
          id: 2, 
          title: 'Electricidad Domiciliaria', 
          description: 'Instalaciones y reparaciones eléctricas para hogares con la máxima seguridad y profesionalismo.', 
          image: '/images/home-electric.png'
        },
        { 
          id: 3, 
          title: 'Reparación de Fallas', 
          description: 'Diagnóstico preciso y solución de todo tipo de fallas eléctricas, tanto automotrices como domiciliarias.', 
          image: '/images/repair.png'
        },
        { 
          id: 4, 
          title: 'Instalación de Accesorios', 
          description: 'Instalación profesional de accesorios eléctricos para vehículos y domicilios.', 
          image: '/images/accessories.jpg'
        },
        { 
          id: 5, 
          title: 'Automatización', 
          description: 'Soluciones de automatización para mejorar la eficiencia y seguridad de su hogar o negocio.', 
          image: '/images/automation.jpg'
        }
      ];
      
      setServices(mockServices);
      setLoading(false);
    }, 1000);
    
    // Uncomment when backend is ready
    // fetchServices();
  }, []);

  return (
    <>
      <Helmet>
        <title>Servicios | SYCA SPA</title>
        <meta 
          name="description" 
          content="Conoce nuestros servicios de electricidad automotriz, domiciliaria, reparación de fallas, instalación de accesorios y automatización."
        />
      </Helmet>
      
      <PageHeader>
        <div>
          <HeaderTitle>
            Nuestros <span>Servicios</span>
          </HeaderTitle>
          <HeaderDescription>
            En SYCA SPA ofrecemos una amplia gama de servicios eléctricos para vehículos y hogares, 
            adaptados a tus necesidades específicas.
          </HeaderDescription>
        </div>
      </PageHeader>
      
      <ServicesSection>
        <Container>
          <SectionTitle>
            Soluciones Eléctricas <span>Profesionales</span>
          </SectionTitle>
          
          {loading && (
            <LoadingContainer>
              <p>Cargando servicios...</p>
            </LoadingContainer>
          )}
          
          {error && (
            <ErrorContainer>
              <p>{error}</p>
            </ErrorContainer>
          )}
          
          {!loading && !error && (
            <ServicesGrid>
              {services.map((service) => (
                <ServiceCard to={`/servicios/${service.id}`} key={service.id}>
                  <CardImageContainer>
                    <CardImage 
                      className="card-image"
                      style={{ backgroundImage: `url(${service.image || '/images/default-service.jpg'})` }}
                    />
                  </CardImageContainer>
                  <CardContent>
                    <CardIcon>
                      {serviceIcons[service.id] || <FaTools />}
                    </CardIcon>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <ReadMoreButton>Ver detalles</ReadMoreButton>
                  </CardContent>
                </ServiceCard>
              ))}
            </ServicesGrid>
          )}
        </Container>
      </ServicesSection>
    </>
  );
};

export default Services;