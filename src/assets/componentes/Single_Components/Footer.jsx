import Styled from 'styled-components';
const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px'
};

const Pie_Pagina = Styled.footer`
    background-color: #f9d77e;
    color: #4e342e;
    text-align: center;
    padding: 0.5rem;
    font-size: 0.75rem;
    border-radius: 12px 12px 0 0;
    height: 90px;
    margin-top: auto;
`;

function Footer() {
    return(

        <Pie_Pagina>
                <h2>Colmenares del Eje</h2>
                <p>@2025 Todos los derechos reservados</p>
        </Pie_Pagina>

    )


};

export default Footer;