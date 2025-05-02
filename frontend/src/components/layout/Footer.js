import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 3rem 0 1rem;
`;

const FooterContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div`
  h3 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 60px;
      height: 2px;
      background-color: var(--primary-color);
    }
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
  
  img {
    height: 60px;
  }
  
  h2 {
    color: var(--primary-color);
    margin-top: 0.5rem;
  }
`;

const FooterDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FooterLinks = styled.ul`
  li {
    margin-bottom: 0.8rem;
  }
  
  a {
    color: #ccc;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
      padding-left: 5px;
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 1.5rem;
  
  p {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    
    svg {
      margin-right: 10px;
      color: var(--primary-color);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #333;
    color: #fff;
    margin-right: 10px;
    transition: var(--transition);
    
    &:hover {
      background-color: var(--primary-color);
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 20px 0;
  text-align: center;
  border-top: 1px solid #333;
  margin-top: 2rem;
  
  p {
    color: #999;
    font-size: 0.9rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>
            <img src="./images/logo.png" alt="SYCA SPA Logo" />
            <h2>SYCA SPA</h2>
          </FooterLogo>
          <FooterDescription>
            Servicios de electricidad automotriz y domiciliaria. 
            Reparación de fallas, instalación de accesorios y 
            automatización de todo tipo.
          </FooterDescription>
          <SocialLinks>
            <a href="https://instagram.com/syca_spa" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <h3>Servicios</h3>
          <FooterLinks>
            <li>
              <Link to="/servicios/1">Electricidad Automotriz</Link>
            </li>
            <li>
              <Link to="/servicios/2">Electricidad Domiciliaria</Link>
            </li>
            <li>
              <Link to="/servicios/3">Reparación de Fallas</Link>
            </li>
            <li>
              <Link to="/servicios/4">Instalación de Accesorios</Link>
            </li>
            <li>
              <Link to="/servicios/5">Automatización</Link>
            </li>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <h3>Enlaces</h3>
          <FooterLinks>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/servicios">Servicios</Link>
            </li>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <h3>Contacto</h3>
          <ContactInfo>
            <p>
              <FaPhone />
              +56 9 8181 59 42
            </p>
            <p>
              <FaEnvelope />
              info@sycaspa.cl
            </p>
            <p>
              <FaMapMarkerAlt />
              Sebastián Bahamondes, Santiago, Chile
            </p>
          </ContactInfo>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} SYCA SPA. Todos los derechos reservados.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;