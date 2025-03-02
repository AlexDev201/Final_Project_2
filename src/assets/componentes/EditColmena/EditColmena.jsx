import Styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../Single_Components/NavBar';
import Aside_Card from '../Single_Components/Aside';
import Footer from '../Single_Components/Footer';

const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px'
};

const Wrapper = Styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    flex: 1;
`;

const FormContainer = Styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid grey;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    height: 100%;
    width: 100%;
    max-width: 495px;
`;

const Form = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
`;

const Label = Styled.label`
    font-weight: 500;
    color: rgb(10, 10, 10);
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
`;

const Input = Styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ffcc80;
    border-radius: 10px;
    background-color: #fffde7;
    color: #4e342e;
    font-size: 1rem;
    transition: border-color 0.3s;
    &:focus {
        outline: none;
        border-color: #ffb300;
    }
`;

const Title = Styled.h1`
    margin: 0;
    color: rgb(0, 0, 0);
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1.5rem;
    @media (max-width: ${breakpoints.mobile}) {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
`;

const Select = Styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ffcc80;
    border-radius: 10px;
    background-color: #fffde7;
    color: #4e342e;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
`;

const ButtonContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = Styled.button`
    background-color: #f9d77e;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #4e342e;
    width: 150px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f8c150;
    }
`;

const PopupOverlay = Styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${props => props.isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const PopupContent = Styled.div`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    position: relative;
    width: 400px;
    transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0.1)'};
    transition: transform 0.4s ease-in-out;
`;

const SuccessIcon = Styled.div`
    width: 80px;
    height: 80px;
    margin: -40px auto 20px;
    border-radius: 50%;
    background: #f9d77e;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
        content: '✓';
        font-size: 40px;
        color: white;
    }
`;

const PopupTitle = Styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
`;

const PopupButton = Styled.button`
    background: #f9d77e;
    color: black;
    border: none;
    padding: 10px 30px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background: #f8c150;
    }
`;

function EditColmena() {
    const { colmenaId } = useParams(); // Obtener el ID de la colmena desde la URL
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        cantidadCriasAbierta: '',
        cantidadCriasOperculada: '',
        cuadrosComida: '',
        presenciaReina: '',
        colorReina: '',
        origenReina: '',
        reportesGenerales: ''
    });
    const [loading, setLoading] = useState(true);

    // Cargar datos iniciales de la colmena
    useEffect(() => {
        if (!colmenaId) {
            console.error('No colmenaId provided');
            setLoading(false);
            return;
        }

        const fetchColmenaData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                // Usamos list-hives y filtramos; idealmente, crea un endpoint /detail/<pk>/
                const response = await fetch(`http://127.0.0.1:8000/beehive/list-hives/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const colmena = data.find(c => c.id === parseInt(colmenaId));
                if (colmena) {
                    setFormData({
                        cantidadCriasAbierta: colmena.open_brood_frames || '',
                        cantidadCriasOperculada: colmena.capped_brood_frames || '',
                        cuadrosComida: colmena.food_frames || '',
                        presenciaReina: colmena.queen_presence ? 'Sí' : 'No',
                        colorReina: colmena.queen_color || '',
                        origenReina: colmena.origin || '',
                        reportesGenerales: colmena.observations || ''
                    });
                } else {
                    throw new Error('Colmena no encontrada en la lista');
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setErrors({ fetch: 'Error al cargar los datos de la colmena' });
            } finally {
                setLoading(false);
            }
        };

        fetchColmenaData();
    }, [colmenaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = (formData) => {
        let errors = {};
        let isValid = true;

        if (formData.cantidadCriasAbierta && !/^\d+$/.test(formData.cantidadCriasAbierta)) {
            errors.cantidadCriasAbierta = "Ingrese un número entero válido";
            isValid = false;
        } else if (formData.cantidadCriasAbierta && (parseInt(formData.cantidadCriasAbierta) < 0 || parseInt(formData.cantidadCriasAbierta) > 100)) {
            errors.cantidadCriasAbierta = "El valor debe estar entre 0 y 100";
            isValid = false;
        }

        if (formData.cantidadCriasOperculada && !/^\d+$/.test(formData.cantidadCriasOperculada)) {
            errors.cantidadCriasOperculada = "Ingrese un número entero válido";
            isValid = false;
        } else if (formData.cantidadCriasOperculada && (parseInt(formData.cantidadCriasOperculada) < 0 || parseInt(formData.cantidadCriasOperculada) > 100)) {
            errors.cantidadCriasOperculada = "El valor debe estar entre 0 y 100";
            isValid = false;
        }

        if (formData.cuadrosComida && !/^\d+$/.test(formData.cuadrosComida)) {
            errors.cuadrosComida = "Ingrese un número entero válido";
            isValid = false;
        } else if (formData.cuadrosComida && (parseInt(formData.cuadrosComida) < 0 || parseInt(formData.cuadrosComida) > 100)) {
            errors.cuadrosComida = "El valor debe estar entre 0 y 100";
            isValid = false;
        }

        if (formData.reportesGenerales && formData.reportesGenerales.length > 90) {
            errors.reportesGenerales = "Máximo 90 caracteres";
            isValid = false;
        } else if (formData.reportesGenerales && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,()-]+$/.test(formData.reportesGenerales)) {
            errors.reportesGenerales = "Caracteres no permitidos";
            isValid = false;
        }

        return { isValid, errors };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateForm(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        if (!colmenaId) {
            alert('No se especificó el ID de la colmena');
            return;
        }

        try {
            const apiData = {};
            if (formData.cantidadCriasAbierta) apiData.open_brood_frames = parseInt(formData.cantidadCriasAbierta, 10);
            if (formData.cantidadCriasOperculada) apiData.capped_brood_frames = parseInt(formData.cantidadCriasOperculada, 10);
            if (formData.cuadrosComida) apiData.food_frames = parseInt(formData.cuadrosComida, 10);
            if (formData.presenciaReina) apiData.queen_presence = formData.presenciaReina === 'Sí';
            if (formData.colorReina) apiData.queen_color = formData.colorReina;
            if (formData.origenReina) apiData.origin = formData.origenReina;
            if (formData.reportesGenerales) apiData.observations = formData.reportesGenerales;

            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`http://127.0.0.1:8000/beehive/edit-hive/${colmenaId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(apiData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log('Colmena actualizada exitosamente:', data);
            setShowPopup(true);
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Error al actualizar la colmena: ' + error.message);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        navigate('/Dashboard');
    };

    if (loading) return <div>Cargando...</div>;
    if (errors.fetch) return <div>{errors.fetch}</div>;

    return (
        <Wrapper>
            <NavBar />
            <div className='container py-4'>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-12 mb-4">
                        <FormContainer>
                            <Form onSubmit={handleSubmit}>
                                <Title>Editar Colmena</Title>
                                <Label>Cantidad de Cuadros de Cría Abierta</Label>
                                <Input
                                    type='number'
                                    name='cantidadCriasAbierta'
                                    placeholder='Ingrese el número de cuadros'
                                    value={formData.cantidadCriasAbierta}
                                    onChange={handleChange}
                                />
                                {errors.cantidadCriasAbierta && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.cantidadCriasAbierta}</div>}

                                <Label>Cantidad de Cuadros de Cría Operculada</Label>
                                <Input
                                    type='number'
                                    name='cantidadCriasOperculada'
                                    placeholder='Ingrese el número de cuadros'
                                    value={formData.cantidadCriasOperculada}
                                    onChange={handleChange}
                                />
                                {errors.cantidadCriasOperculada && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.cantidadCriasOperculada}</div>}

                                <Label>Cuadros de Comida</Label>
                                <Input
                                    type='number'
                                    name='cuadrosComida'
                                    placeholder='Ingrese la cantidad de cuadros de comida'
                                    value={formData.cuadrosComida}
                                    onChange={handleChange}
                                />
                                {errors.cuadrosComida && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.cuadrosComida}</div>}

                                <Label>Presencia de la Reina</Label>
                                <Select
                                    name='presenciaReina'
                                    value={formData.presenciaReina}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Sí">Sí</option>
                                    <option value="No">No</option>
                                </Select>

                                <Label>Color de Reina</Label>
                                <Select
                                    name='colorReina'
                                    value={formData.colorReina}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Blanca">Blanca</option>
                                    <option value="Amarilla">Amarilla</option>
                                    <option value="Roja">Roja</option>
                                    <option value="Verde">Verde</option>
                                    <option value="Azul">Azul</option>
                                </Select>

                                <Label>Origen de la Reina</Label>
                                <Select
                                    name='origenReina'
                                    value={formData.origenReina}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Africanita">Africanita</option>
                                    <option value="Europea">Europea</option>
                                    <option value="Asiatica">Asiática</option>
                                </Select>

                                <Label>Observaciones Generales</Label>
                                <Input
                                    type='text'
                                    name='reportesGenerales'
                                    placeholder='Ingrese las observaciones generales'
                                    value={formData.reportesGenerales}
                                    onChange={handleChange}
                                />
                                {errors.reportesGenerales && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.reportesGenerales}</div>}

                                <ButtonContainer>
                                    <Button type="submit">Actualizar</Button>
                                </ButtonContainer>
                            </Form>
                        </FormContainer>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Aside_Card />
                    </div>
                </div>
            </div>
            <Footer />
            <PopupOverlay isVisible={showPopup}>
                <PopupContent isVisible={showPopup}>
                    <SuccessIcon />
                    <PopupTitle>Actualización Exitosa</PopupTitle>
                    <p>La colmena ha sido actualizada exitosamente</p>
                    <PopupButton onClick={closePopup}>Aceptar</PopupButton>
                </PopupContent>
            </PopupOverlay>
        </Wrapper>
    );
}

export default EditColmena;