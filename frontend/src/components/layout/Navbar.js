import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavbarContainer = styled.header`
  background-color: #222;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  
  img {
    height: 50px;
  }
  
  span {
    color: var(--primary-color);
    font-size: 1.5rem;
    font-weight: 700;
    margin-left: 0.5rem;
  }
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  color: white;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 60%;
    height: 100vh;
    background: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    z-index: 999;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  font-weight: 500;
  padding: 0.5rem;
  transition: var(--transition);
  position: relative;
  
  &:hover, &.active {
    color: var(--primary-color);
  }
  
  &.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary-color);
    
    @media (max-width: 768px) {
      bottom: -2px;
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const ContactButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-left: 1rem;
  transition: var(--transition);
  
  &:hover {
    background-color: #e55c00;
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0 0 0;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Cerrar menú al cambiar de página
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <NavbarContainer style={{ 
      backgroundColor: scrolled ? '#1a1a1a' : '#222',
      transition: 'all 0.3s ease'
    }}>
      <NavContent>
        <Logo to="/">
          <img src="/images/logo.png" alt="SYCA SPA Logo" />
          <span>SYCA SPA</span>
        </Logo>
        
        <MenuIcon onClick={toggleMenu}>
          <FaBars />
        </MenuIcon>
        
        <Nav isOpen={isOpen}>
          <CloseButton onClick={toggleMenu}>
            <FaTimes />
          </CloseButton>
          
          <NavList>
            <NavItem>
              <NavLink 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Inicio
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                to="/servicios" 
                className={location.pathname.includes('/servicios') ? 'active' : ''}
              >
                Servicios
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                to="/nosotros" 
                className={location.pathname === '/nosotros' ? 'active' : ''}
              >
                Nosotros
              </NavLink>
            </NavItem>
            <NavItem>
              <ContactButton to="/contacto">
                Contacto
              </ContactButton>
            </NavItem>
          </NavList>
        </Nav>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;