import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../Single_Components/NavBar';
import Footer from '../Single_Components/Footer';
import imagen2 from 'src/img/imagen_ejemplo.jpg';
import { useEffect } from 'react';
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};


const Logo = styled.img`
  height: 35px;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    height: 50px;
    margin-bottom: 0;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;





const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.tablet}) {
    flex: 2;
    margin: 0;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  margin-top: 10px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  flex: 1;

  
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    padding: 20px;
    margin-top: 0;
  }
`;

const Section = styled.section`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  border: 1px solid gray;
  max-width: 100%;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  border: 1px solid gray;
  object-fit: cover;

  @media (min-width: ${breakpoints.tablet}) {
    width: 300px;
    height: 150px;
  }
`;

const DivSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: rgb(248, 227, 174);
  border: 2px solid #f6e7ff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  margin-top: 5px;
  cursor: pointer;
  
  /* Estilos para las opciones */
  option {
    padding: 8px;
    font-size: 0.9rem;
    background-color: white;
  }

  /* Móvil pequeño */
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px;
    font-size: 0.8rem;
    
    option {
      padding: 6px;
      font-size: 0.8rem;
    }
  }

  /* Tablet */
  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
    min-width: 150px;
    margin-top: 0;
    padding: 10px;
    font-size: 1rem;
    
    option {
      padding: 10px;
      font-size: 1rem;
    }
  }

  /* Desktop */
  @media (min-width: ${breakpoints.desktop}) {
    min-width: 180px;
    padding: 12px;
    font-size: 1rem;
    
    option {
      padding: 12px;
      font-size: 1rem;
    }
  }

  &:focus {
    outline: none;
    border-color: #f8c150;
  }
`;

const Aside = styled.aside`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border: 1px solid gray;
  font-size: 1.2rem;
  max-width: 350px;
  margin: 0 auto;
  height: 36rem;
  @media (min-width: ${breakpoints.tablet}) {
    flex: 1;
    font-size: 1.6rem;
    margin: 0;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid gray;

  @media (min-width: ${breakpoints.tablet}) {
    width: 100px;
    height: 100px;
  }
`;


//PopUp Styles
const PopupOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
opacity: ${props => props.isVisible ? 1 : 0};
visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
transition: opacity 0.2s, visibility 0.2s;
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0.1)'};
  transition: transform 0.4s ease-in-out;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
  height: 32rem;
  @media (max-width: ${breakpoints.mobile}) {
      padding: 1.5rem;
  }
`;



const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PopupBody = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
      align-items: center;
  }
`;


const PopupImageSection = styled.div`
  flex: 0 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 19.5px;
`;

const PopupInfoSection = styled.div`
  flex: 1;
  text-align: left;
  padding: 4px:

  p {
      margin: 8px 0;
      font-size: 1rem;
      line-height: 1.5;
  }

  @media (max-width: ${breakpoints.mobile}) {
      text-align: center;
  }
`;

const CloseIcon = styled.button`
    width: 30px;
    height: 30px;
    background: #f9d77e;
    border-radius: 100%;
    position: absolute;
    left: 88%;
    bottom: 90%;
    border: none;
    &::after {
        content: 'X';
        font-size: 20px;
        color: white;
    }

    @media (max-width: ${breakpoints.mobile}) {
        width: 60px;
        height: 60px;
        margin: -30px auto 15px;
        
        &::after {
            font-size: 30px;
        }
    }
`;


const PopupTitle = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 20px;
    }
`;



const PopupButtonsContainer = styled.div`
   display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0;
  position: absolute;
  width: 150px;  // El mismo ancho que la imagen
  margin-top: -14px;  // Un poco más que el alto de la imagen (150px) para dar espacio
  left: 1.8rem;  // Alinear con el margen izquierdo donde está la imagen
`;


const PopupButton = styled.button`
    background: #f9d77e;
    color: black;
    border: none;
    padding: 10px 30px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    margin: 15px;
    height:40px;
    width:138px;
    text-align:center;
    border-radius: 12px;
    &:hover {
        background: #f8c150;
    }

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 14px;
        padding: 8px 24px;
    }
`;


const List_Recoleccion = () => {
  const navigate = useNavigate();
  const [selectedRecoleccionDate, setSelectedRecoleccionDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const recoleccionInicial = [
    { fechaRecoleccion: '2025-02-01' },
    { fechaRecoleccion: '2025-02-07' },
    { fechaRecoleccion: '2025-02-06' }
  ];

  const recoleccionCompleta = [
    {
      fechaRecoleccion: '2025-02-01',
      produccionMiel: '45gr',
      produccionPolen: '23gr'
    },
    {
      fechaRecoleccion: '2025-02-07',
      produccionMiel: '34gr',
      produccionPolen: '32gr'
    },
    {
      fechaRecoleccion: '2025-02-06',
      produccionMiel: '43gr',
      produccionPolen: '42gr'
    }
  ];

  const handleSelectChange = (e, fecha) => {
    switch(e.target.value) {
      case 'editar':
        navigate('/EditarRecoleccion');
        break;
      case 'visualizar-detalles':
        setSelectedRecoleccionDate(null);
        setTimeout(() => {
          setSelectedRecoleccionDate(fecha);
          setShowPopup(true);
        }, 10);
        break;
      default:
        break;
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setSelectedRecoleccionDate(null);
    }, 400);
  };

  //Conexion al backend 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/harvesting/list-hive-harvesting/');
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);


  return (
    <PageWrapper>
      <ContentWrapper>
        <NavBar />
        <Container>
          <Main>
            {recoleccionInicial.map((recoleccion) => (
              <Section key={recoleccion.fechaRecoleccion}>
                <Img 
                  src={imagen2}
                  alt={`Recolección del ${recoleccion.fechaRecoleccion}`} 
                />
                <DivSection>
                  <h3>Fecha: {new Date(recoleccion.fechaRecoleccion).toLocaleDateString()}</h3>
                </DivSection>
                <Select onChange={(e) => handleSelectChange(e, recoleccion.fechaRecoleccion)}>
                  <option value="">Seleccionar</option>
                  <option value="editar">Editar</option>
                  <option value="visualizar-detalles">Visualizar Detalles</option>
                </Select>
              </Section>
            ))}
          </Main>

          <Aside>
          <h2>Apicultor</h2>
            <ProfileImage src="src/img/profile-pic.jpeg" alt="Perfil" />
            <h3>Giovanny Molina</h3>
            <Select>
              <option value="">Colmenas Relacionadas</option>
            </Select>
          </Aside>
        </Container>

        

        <PopupOverlay isVisible={showPopup}>
          <PopupContent isVisible={showPopup}>
            <CloseIcon onClick={closePopup} />
            <Logo src="src/img/Colmenares_del_eje_logo.png" alt="Logo" />
            {selectedRecoleccionDate && (
              (() => {
                const selectedRecoleccion = recoleccionCompleta.find(
                  r => r.fechaRecoleccion === selectedRecoleccionDate
                );
                if (selectedRecoleccion) {
                  return (
                    <>
                      <PopupTitle>Información de la Recolección</PopupTitle>
                      <PopupBody>
                        <PopupImageSection>
                          <img 
                            src= {imagen2}
                            alt="Imagen recolección"
                            style={{
                              width: '150px',
                              height: '150px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '3px solid gray'
                            }}
                          />
                        </PopupImageSection>
                        <PopupInfoSection>
                          <p><strong>Fecha:</strong> {new Date(selectedRecoleccion.fechaRecoleccion).toLocaleDateString()}</p>
                          <p><strong>Producción de Miel:</strong> {selectedRecoleccion.produccionMiel}</p>
                          <p><strong>Producción de Polen:</strong> {selectedRecoleccion.produccionPolen}</p>
                        </PopupInfoSection>
                      </PopupBody>
                      <PopupButtonsContainer>
                        <PopupButton>Editar</PopupButton>
                        <PopupButton>Eliminar</PopupButton>
                      </PopupButtonsContainer>
                    </>
                  );
                } else {
                  return <p>No se encontró información detallada para esta recolección.</p>;
                }
              })()
            )}
          </PopupContent>
        </PopupOverlay>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default List_Recoleccion;