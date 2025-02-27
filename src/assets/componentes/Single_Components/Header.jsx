import Styled from 'styled-components';

const Cabeza_Pagina = Styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #f9d77e;
    padding: 0.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 110px;
    border-radius: 0 0 12px 12px;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        padding: 1rem;
    }
`;

const Title = Styled.h1`
    margin: 0;
    color: #4e342e;
    font-size: 2.3rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Logo = Styled.img`
    height: 50px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 768px) {
        position: static;
        transform: none;
        margin-bottom: 10px;
    }
`;



function Header(){
    return(
        <Cabeza_Pagina>
            <Logo src="src/img/Colmenares_del_eje_logo.png" alt="Logo" />
            <Title>Colmenares del Eje</Title>
        </Cabeza_Pagina>
    )
}

export default Header;
