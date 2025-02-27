import React, { useState } from "react";
import styled from "styled-components";
import { Container, Button, Card, Image } from "react-bootstrap";
import { PersonStandingIcon } from "lucide-react";

const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

// Componente Aside utilizando componentes de Bootstrap con styled-components
const StyledCard = styled(Card)`
  text-align: center;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
  font-size: 1.2rem;
  width: 100%;
  min-width: 394px;
  margin: 0 auto;
  height: auto;
  min-height: 550px;
  max-height: 800px;
  
  @media (min-width: ${breakpoints.tablet}) {
    max-width: 346px;
    font-size: 1.6rem;
    margin: 0;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const StyledCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
`;

const StyledProfileImage = styled(Image)`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 3px solid gray;
  
  @media (min-width: ${breakpoints.tablet}) {
    width: 100px;
    height: 100px;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: rgb(248, 227, 174);
  border: 2px solid #f6e7ff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  margin-top: 5px;
  cursor: pointer;
  
  option {
    padding: 8px;
    font-size: 0.9rem;
    background-color: white;
  }
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

// Componentes para la versión móvil
const MobileContainer = styled.div`
  display: none;
  
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
`;

const IconButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #333;
  border: 1px solid gray;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 0;
  
  &:hover, &:focus {
    background-color: #f8f9fa;
    color: #333;
  }
`;

const MobileMenu = styled(Card)`
  position: absolute;
  bottom: 70px;
  right: 0;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
`;

function Aside_Card() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  let rol = '';
  const username = sessionStorage.getItem('username');
  const role = localStorage.getItem('role');
  
  if (role === 'admin') {
    rol = `Administrador`;
  }
  if (role === 'beekeeper') {
    rol = 'Apicultor';
  }
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <>
      {/* Versión para tablet/desktop que usa componentes Bootstrap */}
      <Container className="d-none d-md-block">
        <StyledCard>
          <StyledCardBody>
            <Card.Title as="h2">{rol}</Card.Title>
            <StyledProfileImage src="src/img/profile-pic.jpeg" alt="Perfil" roundedCircle />
            <Card.Title as="h3">{username}</Card.Title>
            <StyledSelect className="form-select">
              <option value="">Colmenas Relacionadas</option>
            </StyledSelect>
          </StyledCardBody>
        </StyledCard>
      </Container>
      
      {/* Versión para móvil con componentes Bootstrap */}
      <MobileContainer>
        <IconButton variant="light" onClick={toggleMobileMenu}>
          <PersonStandingIcon size={30} />
        </IconButton>
        
        {showMobileMenu && (
          <MobileMenu>
            <Card.Body className="text-center">
              <Card.Title as="h5">{rol}</Card.Title>
              <Image 
                src="src/img/profile-pic.jpeg" 
                alt="Perfil" 
                roundedCircle 
                style={{ width: '50px', height: '50px', border: '2px solid gray' }}
                className="my-2"
              />
              <Card.Subtitle as="h6" className="mb-2">{username}</Card.Subtitle>
              <select className="form-select form-select-sm mt-2">
                <option value="">Colmenas Relacionadas</option>
              </select>
            </Card.Body>
          </MobileMenu>
        )}
      </MobileContainer>
    </>
  );
}

export default Aside_Card;