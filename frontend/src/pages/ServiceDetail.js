import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { FaArrowLeft, FaCheck, FaPhone } from 'react-icons/fa';

// Componentes de estilos
const ServiceHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url(${props => props.bgImage || '/images/service-detail-header.jpg'}) no-repeat center center/cover;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
`;

const HeaderContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
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
  }
`;

const ServiceContent = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  @media (max-width: 768px) {
    grid-row: 1;
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
  }
`;

const ServiceDescription = styled.div`
  margin-bottom: 2.5rem;
  
  p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #555;
  }
`;

const FeaturesList = styled.ul`
  margin-bottom: 2.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    color: var(--primary-color);
    margin-right: 10px;
    min-width: 16px;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-top: 2rem;
  color: var(--primary-color);
  font-weight: 500;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContactCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #e55c00;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #ddd;
  }
  
  span {
    padding: 0 10px;
    color: #777;
  }
`;

const CallButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: #444;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 5rem 0;
  
  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 5rem 0;
  
  p {
    font-size: 1.2rem;
    color: #e55c00;
  }
`;

// Página de detalle de servicio
const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    try {
      // Simulación de envío al backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En un entorno real, enviaríamos los datos al backend:
      // await axios.post('/api/contact', formData);
      
      setFormSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setFormError('Error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
      console.error('Error submitting form:', err);
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Fetch service details from API
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(`/api/services/${id}`);
        setService(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los detalles del servicio. Por favor, inténtalo de nuevo más tarde.');
        setLoading(false);
        console.error('Error fetching service details:', err);
      }
    };
    
    // Simulamos la carga de datos ya que no tenemos el backend activo aún
    setTimeout(() => {
      // Datos mockup para los servicios (esto vendría del backend)
      const mockServices = {
        1: { 
          id: 1, 
          title: 'Electricidad Automotriz', 
          description: 'Servicios completos de diagnóstico y reparación de sistemas eléctricos para todo tipo de vehículos.', 
          details: [
            'Diagnóstico electrónico computarizado',
            'Reparación de alternadores y motores de arranque',
            'Instalación de sistemas de iluminación',
            'Reparación de sistemas de climatización',
            'Servicio para vehículos diésel y gasolina'
          ],
          longDescription: 'Nuestro servicio de electricidad automotriz está diseñado para diagnosticar y resolver cualquier problema eléctrico en su vehículo. Utilizamos equipos de diagnóstico avanzados y contamos con técnicos especializados que pueden identificar rápidamente el origen de las fallas eléctricas. Desde problemas con el sistema de arranque hasta complejas fallas en los sistemas electrónicos modernos, tenemos la experiencia y las herramientas para ofrecer soluciones efectivas. Trabajamos con todos los modelos y marcas de vehículos, garantizando un servicio profesional y de alta calidad.',
          image: '/images/auto-electric.png'
        },
        2: { 
          id: 2, 
          title: 'Electricidad Domiciliaria', 
          description: 'Instalaciones y reparaciones eléctricas para hogares con la máxima seguridad y profesionalismo.', 
          details: [
            'Instalaciones eléctricas completas',
            'Reparaciones y mantenimiento',
            'Actualización de tableros eléctricos',
            'Instalación de luminarias',
            'Detección y solución de fallas'
          ],
          longDescription: 'Ofrecemos servicios completos de electricidad domiciliaria para garantizar la seguridad y eficiencia de su hogar. Desde nuevas instalaciones hasta la reparación de sistemas existentes, nuestros electricistas certificados trabajan con el máximo profesionalismo y cumpliendo todas las normativas vigentes. Nos especializamos en detección de fallas, actualización de sistemas antiguos, instalación de iluminación eficiente y mejoras que optimicen el consumo energético. Todos nuestros trabajos incluyen garantía y aseguramos una atención personalizada para entender y satisfacer sus necesidades específicas.',
          image: '/images/home-electric.png'
        },
        3: { 
          id: 3, 
          title: 'Reparación de Fallas', 
          description: 'Diagnóstico preciso y solución de todo tipo de fallas eléctricas, tanto automotrices como domiciliarias.', 
          details: [
            'Diagnóstico avanzado de fallas',
            'Reparación de cortocircuitos',
            'Solución a problemas de arranque',
            'Reparación de sistemas de carga',
            'Análisis de consumo eléctrico irregular'
          ],
          longDescription: 'Nuestro servicio de reparación de fallas eléctricas se caracteriza por un diagnóstico preciso y soluciones efectivas para todo tipo de problemas. Utilizamos tecnología avanzada para detectar cortocircuitos, sobrecalentamientos, consumos irregulares y otros problemas eléctricos que pueden comprometer la seguridad y funcionamiento de su vehículo o hogar. Nuestros técnicos están capacitados para resolver desde pequeñas fallas hasta problemas complejos en sistemas integrados. Trabajamos de manera minuciosa para asegurar que la solución sea permanente y que el sistema eléctrico funcione con la máxima eficiencia.',
          image: '/images/repair.png'
        },
        4: { 
          id: 4, 
          title: 'Instalación de Accesorios', 
          description: 'Instalación profesional de accesorios eléctricos para vehículos y domicilios.', 
          details: [
            'Instalación de luces LED',
            'Sistemas de audio y multimedia',
            'Alarmas y sistemas de seguridad',
            'Cámaras de retroceso',
            'Sensores de estacionamiento'
          ],
          longDescription: 'Mejore la funcionalidad y estética de su vehículo o hogar con nuestra instalación profesional de accesorios eléctricos. Para automóviles, ofrecemos instalación de sistemas de iluminación LED, equipos de audio de alta fidelidad, alarmas, GPS, cámaras de retroceso y más. En el ámbito domiciliario, instalamos sistemas de iluminación decorativa, equipos de sonido integrados, cámaras de seguridad y otros accesorios que mejoren su calidad de vida. Todos nuestros trabajos se realizan con atención al detalle, utilizando materiales de calidad y asegurando un acabado estético que se integre perfectamente con el diseño original.',
          image: '/images/accessories.jpg'
        },
        5: { 
          id: 5, 
          title: 'Automatización', 
          description: 'Soluciones de automatización para mejorar la eficiencia y seguridad de su hogar o negocio.', 
          details: [
            'Instalación de sistemas domóticos',
            'Control de iluminación',
            'Automatización de portones',
            'Sistemas de seguridad',
            'Control remoto de dispositivos'
          ],
          longDescription: 'Transforme su hogar o negocio con nuestras soluciones de automatización de vanguardia. Instalamos sistemas que le permiten controlar iluminación, clima, seguridad y más desde su smartphone o mediante comandos de voz. Nuestras soluciones de domótica se adaptan a sus necesidades y presupuesto, desde opciones básicas hasta sistemas completamente integrados. La automatización no solo aporta comodidad, sino que también mejora la eficiencia energética y refuerza la seguridad. Trabajamos con las mejores marcas del mercado y ofrecemos asesoramiento personalizado para que aproveche al máximo las posibilidades de la tecnología actual.',
          image: '/images/automation.jpg'
        }
      };
      
      if (mockServices[id]) {
        setService(mockServices[id]);
        setLoading(false);
      } else {
        setError('Servicio no encontrado');
        setLoading(false);
      }
    }, 1000);
    
    // Uncomment when backend is ready
    // fetchServiceDetails();
  }, [id]);
  
  // Si el servicio no existe, redirigir a la página de servicios
  useEffect(() => {
    if (error === 'Servicio no encontrado') {
      setTimeout(() => {
        navigate('/servicios');
      }, 2000);
    }
  }, [error, navigate]);

  return (
    <>
      {service && (
        <Helmet>
          <title>{service.title} | SYCA SPA</title>
          <meta 
            name="description" 
            content={service.description}
          />
        </Helmet>
      )}
      
      {loading && (
        <LoadingContainer>
          <p>Cargando detalles del servicio...</p>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorContainer>
          <p>{error}</p>
          {error === 'Servicio no encontrado' && (
            <p>Redirigiendo a la página de servicios...</p>
          )}
        </ErrorContainer>
      )}
      
      {!loading && !error && service && (
        <>
          <ServiceHeader bgImage={service.image}>
            <HeaderContent>
              <HeaderTitle>{service.title}</HeaderTitle>
              <HeaderDescription>{service.description}</HeaderDescription>
            </HeaderContent>
          </ServiceHeader>
          
          <ServiceContent>
            <Container>
              <MainContent>
                <SectionTitle>Descripción del Servicio</SectionTitle>
                <ServiceDescription>
                  <p>{service.longDescription}</p>
                </ServiceDescription>
                
                <SectionTitle>Lo que ofrecemos</SectionTitle>
                <FeaturesList>
                  {service.details.map((detail, index) => (
                    <FeatureItem key={index}>
                      <FaCheck /> {detail}
                    </FeatureItem>
                  ))}
                </FeaturesList>
                
                <BackLink to="/servicios">
                  <FaArrowLeft /> Volver a Servicios
                </BackLink>
              </MainContent>
              
              <Sidebar>
                <ContactCard>
                  <CardTitle>Solicitar este servicio</CardTitle>
                  
                  {formSuccess ? (
                    <div style={{ textAlign: 'center', color: 'var(--success-color)' }}>
                      <p>¡Gracias por contactarnos! Nos pondremos en contacto contigo a la brevedad.</p>
                    </div>
                  ) : (
                    <ContactForm onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label htmlFor="name">Nombre</Label>
                        <Input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          required 
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="message">Mensaje</Label>
                        <TextArea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          placeholder={`Me interesa el servicio de ${service.title}...`}
                          required 
                        />
                      </FormGroup>
                      
                      {formError && (
                        <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>
                          <p>{formError}</p>
                        </div>
                      )}
                      
                      <SubmitButton type="submit" disabled={formSubmitting}>
                        {formSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                      </SubmitButton>
                    </ContactForm>
                  )}
                  
                  <OrDivider>
                    <span>O</span>
                  </OrDivider>
                  
                  <CallButton href="tel:+56981815942">
                    <FaPhone /> Llámanos ahora
                  </CallButton>
                </ContactCard>
              </Sidebar>
            </Container>
          </ServiceContent>
        </>
      )}
    </>
  );
};

export default ServiceDetail;