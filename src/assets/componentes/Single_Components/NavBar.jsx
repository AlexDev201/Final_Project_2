import { styled, keyframes } from "styled-components";
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

// Animación de "goteo de miel" para el header
const honeyDrip = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Animación para entrada del logo
const buzzing = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-2px) rotate(-1deg);
  }
  20%, 40%, 60%, 80% {
    transform: translateY(2px) rotate(1deg);
  }
`;

// Animación de entrada para los enlaces
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Contenedor con altura adaptable
const HeaderWrapper = styled.div`
  height: auto;
  padding-top: 70px;
  
  @media (min-width: ${breakpoints.tablet}) {
    padding-top: 100px;
  }
`;

// Header con gradiente animado tipo miel
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(45deg, #f9d77e, #f6c96e, #ffab40, #f6c96e);
  background-size: 300% 300%;
  animation: ${honeyDrip} 15s ease infinite;
  padding: 0.8rem 1rem;
  box-shadow: 0 4px 15px rgba(155, 95, 10, 0.15);
  border-radius: 0 0 18px 18px;
  position: fixed;
  width: 100%;
  max-width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: 1rem 2rem;
  }
`;

// Logo con animación de "zumbido" de abeja
const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 35px;
    transition: transform 0.3s ease;
    
    @media (min-width: ${breakpoints.tablet}) {
      height: 50px;
    }
    
    &:hover {
      animation: ${buzzing} 0.8s ease-in-out;
    }
  }
`;

// Contenedor principal de navegación
const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 100%;
  left: 0;
  
  @media (min-width: ${breakpoints.tablet}) {
    position: static;
    flex-direction: row;
    justify-content: flex-end;
    flex-grow: 1;
    padding: 0 20px;
    margin-left: 2rem;
  }
`;

// Contenedor de enlaces que se oculta completamente por defecto en móvil
const LinksContainer = styled.div`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
  background: linear-gradient(45deg, #f9d77e, #f6c96e);
  padding: 0.8rem 0;
  border-radius: 0 0 18px 18px;
  box-shadow: 0 4px 10px rgba(155, 95, 10, 0.1);
  
  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 2rem;
    padding: 0;
    background: none;
    box-shadow: none;
  }
`;

// Enlaces con iconos y efectos - versión más compacta para móvil
const LinkNav = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #5d4037;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 8px 12px;
  font-size: 0.9rem;
  width: 85%;
  text-align: center;
  border-radius: 10px;
  position: relative;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index * 0.1}s;
  opacity: 0;
  
  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
    font-size: 1.1rem;
    padding: 12px 20px;
  }
  
  svg {
    margin-right: 6px;
    font-size: 1.1rem;
    transition: transform 0.3s ease;
    
    @media (min-width: ${breakpoints.tablet}) {
      margin-right: 8px;
      font-size: 1.2rem;
    }
  }
  
  &:hover {
    color: #5d4037;
    transform: translateY(-2px);
    background-color: rgba(255, 171, 64, 0.2);
    box-shadow: 0 2px 8px rgba(255, 171, 64, 0.2);
    
    svg {
      transform: rotate(10deg) scale(1.2);
    }
  }
  
  &.active {
    background-color: #ffab40;
    color: #4e342e;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(255, 171, 64, 0.3);
  }
`;

// Botón de menú hamburguesa
const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
  
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

// Líneas del menú hamburguesa
const HamburgerLine = styled.div`
  width: 25px;
  height: 3px;
  background-color: #5d4037;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
  
  // Transformaciones para el efecto X cuando el menú está abierto
  &:nth-child(1) {
    transform: ${props => props.$isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
  }
  
  &:nth-child(2) {
    opacity: ${props => props.$isOpen ? '0' : '1'};
  }
  
  &:nth-child(3) {
    transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'rotate(0)'};
  }
`;

// Barra de progreso de scroll
const ScrollIndicator = styled.div`
  height: 3px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, #ff8e3c, #ffab40);
  transition: width 0.3s ease-out;
  width: ${props => props.$scrollProgress}%;
  border-radius: 0 3px 0 0;
`;

function NavBar() {
  // Estado para manejar el progreso de scroll
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Estado para el efecto de aparición gradual
  const [loaded, setLoaded] = useState(false);
  
  // Estado para el menú hamburguesa
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Cierra el menú al cambiar de tamaño de pantalla a tablet/desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Efecto para marcar como cargado después de un breve retardo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentPosition = window.scrollY;
      
      if (totalHeight > 0) {
        setScrollProgress((currentPosition / totalHeight) * 100);
      }
      
      // Cierra el menú al hacer scroll
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <HeaderWrapper>
      <Header style={{ transform: loaded ? 'translateY(0)' : 'translateY(-100%)' }}>
        <Logo>
          <img src="/src/img/Colmenares_del_eje_logo.png" alt="Logo Colmenares" />
        </Logo>
        
        {/* Botón de menú hamburguesa */}
        <HamburgerButton onClick={toggleMenu} aria-label="Menú">
          <HamburgerLine $isOpen={isMenuOpen} />
          <HamburgerLine $isOpen={isMenuOpen} />
          <HamburgerLine $isOpen={isMenuOpen} />
        </HamburgerButton>
        
        <NavContainer>
          <LinksContainer $isOpen={isMenuOpen}>
            <LinkNav to='/HivenRegister' $index={0} onClick={() => setIsMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
              Crear Colmena
            </LinkNav>
            <LinkNav to='/Dashboard' $index={1} onClick={() => setIsMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
              Visualizar Colmena
            </LinkNav>
            <LinkNav to='/ScanQR' $index={2} onClick={() => setIsMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z"/>
                <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z"/>
                <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z"/>
                <path d="M9 2h5v5H9zm1 1v3h3V3zm0 8h1v1h-1z"/>
                <path d="M12 9h2v2h-2zm-1-2h3v5h-3zm-7 4h1v1H4zm7 1h1v1h-1z"/>
              </svg>
              Escanear QR
            </LinkNav>
          </LinksContainer>
        </NavContainer>
        <ScrollIndicator $scrollProgress={scrollProgress} />
      </Header>
    </HeaderWrapper>
  );
}

export default NavBar;