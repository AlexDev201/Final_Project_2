import styled from "styled-components";
import { NavLink } from "react-router-dom";

const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  };
  


const HeaderWrapper = styled.div`
  height: 250px;
  
  @media (min-width: ${breakpoints.tablet}) {
    height: 120px;
  }
`;


const Logo = styled.img`
  height: 35px;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    height: 50px;
    margin-bottom: 0;
  }
`;



const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9d77e;
  padding: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 0 0 12px 12px;
  position: fixed;
  width: 99.2%;
  top: 0;
  z-index: 1000;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    padding: 1rem 2rem;
  }
`;


const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    justify-content: center;
    flex-grow: 1;
    padding: 5px;
    gap: 2rem;
  }
`;

const LinkNav = styled(NavLink)`
  text-decoration: none;
  color: #4e342e;
  font-weight: bold;
  transition: all 0.3s ease;
  padding: 8px;
  font-size: 1rem;
  width: 100%;
  text-align: center;

  @media (min-width: ${breakpoints.tablet}) {
    width: 98.8%;
    font-size: 1.5rem;
    padding: 20px;
  }

  &:hover {
    color: orange;
    transform: scale(1.05);
    border-radius: 12px;
  }

  &.active {
    transform: scale(1.05);
    font-weight: bold;
    background-color: rgb(246, 201, 110);
    border-radius: 12px;

    @media (min-width: ${breakpoints.tablet}) {
      transform: scale(0.9);
      font-size: 1.8rem;
    }
  }
`;



function Admin_Nav_Bar(){
    return(

        <HeaderWrapper>
          <Header>
            <Logo src="src/img/Colmenares_del_eje_logo.png" alt="Logo" />
            <NavContainer>
              <LinkNav to='/UserRegister'>Crear Apicultor</LinkNav>
              <LinkNav to='/ViewApicultor'>Visualizar Apicultor</LinkNav>
              <LinkNav to='/ScanQR'>Vista Apicultor</LinkNav>
            </NavContainer>
          </Header>
        </HeaderWrapper>
    )

    
}

export default Admin_Nav_Bar;