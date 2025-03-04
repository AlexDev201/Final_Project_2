import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import NavBar from '../Single_Components/NavBar';
import Aside_Card from '../Single_Components/Aside';
import Footer from '../Single_Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sistema de breakpoints (mantenido igual)
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

// Ajuste para hacer el FormContainer más compacto
const FormContainer = Styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1.25rem; /* Reducido de 1.5rem */
    border: 1px solid grey;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    height: 100%;
    width: 100%;
    max-width: 495px;
`;

const Title = Styled.h1`
    margin: 0;
    color: rgb(0, 0, 0);
    font-size: 1.7rem; /* Reducido de 1.8rem */
    text-align: center;
    margin-bottom: 1.2rem; /* Reducido de 1.5rem */

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 1.4rem;
        margin-bottom: 0.8rem;
    }
`;

// Reducir el espaciado entre elementos del formulario
const Form = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Reducido de 0.75rem */
    width: 100%;
`;

const Label = Styled.label`
    font-weight: 500;
    color: rgb(10, 10, 10);
    margin-bottom: 0.15rem; /* Reducido de 0.25rem */
    font-size: 0.85rem; /* Reducido de 0.9rem */
`;

const Input = Styled.input`
    width: 100%;
    padding: 0.4rem; /* Reducido de 0.5rem */
    border: 1px solid #ffcc80;
    border-radius: 6px;
    background-color: #fffde7;
    color: #4e342e;
    font-size: 0.85rem; /* Reducido de 0.9rem */
    transition: border-color 0.3s;

    @media (max-width: ${breakpoints.mobile}) {
        padding: 0.35rem;
        font-size: 0.8rem;
    }

    &:focus {
        outline: none;
        border-color: #ffb300;
    }
`;

const Select = Styled.select`
    width: 100%;
    margin: 0.3rem 0; /* Reducido de 0.5rem */
    padding: 0.4rem; /* Reducido de 0.5rem */
    border: 1px solid #ffcc80;
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
    background-color: #fffde7;
    font-size: 0.85rem; /* Añadido para consistencia */

    @media (max-width: ${breakpoints.mobile}) {
        padding: 0.35rem;
        font-size: 0.8rem;
    }
`;

const ButtonContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = Styled.button`
    background-color: #f9d77e;
    border: none;
    padding: 0.45rem 0.9rem; /* Reducido de 0.5rem 1rem */
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.95rem; /* Reducido de 1rem */
    font-weight: bold;
    width: 150px;
    margin-top: 0.8rem; /* Reducido de 1rem */
    transition: background-color 0.3s;
    outline: none;

    &:hover {
        background-color: #f8c150;
    }

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 0.85rem;
        padding: 0.35rem 0.7rem;
    }
`;

// Estilo compacto para los mensajes de error
const ErrorMessage = Styled.div`
    color: red;
    font-size: 0.75rem; /* Más pequeño que 0.8rem */
    margin-top: -0.2rem;
    margin-bottom: 0.2rem;
`;

// Popup styles (mantenidos igual)
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
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0.1)'};
    transition: transform 0.4s ease-in-out;

    @media (max-width: ${breakpoints.mobile}) {
        padding: 1.5rem;
    }
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

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 20px;
    }
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

// Estilos del contenido de la API (sin cambios significativos)
const ClimaInfo = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 60%;
    margin: 0.5rem 0;
    border-radius: 8px;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    margin-left: 18px;
    border: 1px solid gray;
    min-width: 396px;
    h3 {
        font-size: 1.2rem;
        text-align: center;
        margin-bottom: 1rem;
    }
`;

const DataItem = Styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    padding: 0.5rem;
    border-radius: 8px;
    margin: 0.1rem 0;
    align-items: center;
    gap: 0.5rem;

    .icon {
        width: 24px;
        height: 24px;
    }

    .label {
        font-size: 1rem;
        color: black;
    }

    .value {
        font-size: 1rem;
        font-weight: 500;
        text-align: right;
    }
`;

function HivenRegister() {
    const [showPopup, setShowPopup] = useState(false);
    const [ubicacion, setUbicacion] = useState(null);
    const [clima, setClima] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        cantidadCriasAbierta: '',
        cantidadCriasOperculada: '',
        presenciaReina: '',
        colorReina: '',
        origenReina: '',
        reportesGenerales: '',
        estado: '',
        cuadrosComida: '',
        latitud: '',
        longitud: '',
        temperatura_c: '',
        temperatura_f: '',
        clima_texto: '',
        viento_kph: '',
        presion_mb: '',
        humedad: ''
    });

    const [errors, setErrors] = useState({
        cantidadCriasAbierta: '',
        cantidadCriasOperculada: '',
        presenciaReina: '',
        colorReina: '',
        origenReina: '',
        reportesGenerales: '',
        cuadrosComida: ''
    });

    useEffect(() => {
        obtenerUbicacionYClima();
    }, []);

    const obtenerUbicacionYClima = async () => {
        if ("geolocation" in navigator) {
            setCargando(true);
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;
                setUbicacion({ latitude, longitude });

                const respuestaClima = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=ca61bc45a6824e02a51185714251302&q=${latitude},${longitude}&lang=es`
                );
                
                if (!respuestaClima.ok) {
                    throw new Error('Error al obtener datos del clima');
                }

                const datosClima = await respuestaClima.json();
                const current = datosClima.current;

                setClima({
                    temperatura_c: current.temp_c,
                    temperatura_f: current.temp_f,
                    clima_texto: current.condition.text,
                    viento_kph: current.wind_kph,
                    presion_mb: current.pressure_mb,
                    humedad: current.humidity,
                    icono: current.condition.icon
                });

                setFormData(prev => ({
                    ...prev,
                    latitud: latitude,
                    longitud: longitude,
                    temperatura_c: current.temp_c,
                    temperatura_f: current.temp_f,
                    clima_texto: current.condition.text,
                    viento_kph: current.wind_kph,
                    presion_mb: current.pressure_mb,
                    humedad: current.humidity
                }));

            } catch (error) {
                setError('Error al obtener la ubicación o datos del clima');
                console.error('Error:', error);
            } finally {
                setCargando(false);
            }
        }
    };

    const preventLetters = (e) => {
        if (!/[\d.]/.test(e.key) && 
            e.key !== 'Backspace' && 
            e.key !== 'Delete' && 
            e.key !== 'ArrowLeft' && 
            e.key !== 'ArrowRight') {
            e.preventDefault();
        }
        
        if (e.key === '.' && e.target.value.includes('.')) {
            e.preventDefault();
        }
    };

    const validateForm = (formData) => {
        let errors = {};
        let isValid = true;

        if (formData.cantidadCriasAbierta && !/^\d+(\.\d{1,2})?$/.test(formData.cantidadCriasAbierta)) {
            errors.cantidadCriasAbierta = "Ingrese un número válido (hasta 2 decimales)";
            isValid = false;
        } else if (formData.cantidadCriasAbierta && (parseFloat(formData.cantidadCriasAbierta) < 0 || parseFloat(formData.cantidadCriasAbierta) > 100)) {
            errors.cantidadCriasAbierta = "El valor debe estar entre 0 y 100";
            isValid = false;
        }

        if (formData.cantidadCriasOperculada && !/^\d+(\.\d{1,2})?$/.test(formData.cantidadCriasOperculada)) {
            errors.cantidadCriasOperculada = "Ingrese un número válido (hasta 2 decimales)";
            isValid = false;
        } else if (formData.cantidadCriasOperculada && (parseFloat(formData.cantidadCriasOperculada) < 0 || parseFloat(formData.cantidadCriasOperculada) > 100)) {
            errors.cantidadCriasOperculada = "El valor debe estar entre 0 y 100";
            isValid = false;
        }

        if (formData.cuadrosComida && !/^\d+(\.\d{1,2})?$/.test(formData.cuadrosComida)) {
            errors.cuadrosComida = "Ingrese un número válido (hasta 2 decimales)";
            isValid = false;
        } else if (formData.cuadrosComida && (parseFloat(formData.cuadrosComida) < 0 || parseFloat(formData.cuadrosComida) > 100)) {
            errors.cuadrosComida = "El valor debe estar entre 0 y 100";
            isValid = false;
        }

        if (formData.reportesGenerales && formData.reportesGenerales.length > 500) {
            errors.reportesGenerales = "Máximo 500 caracteres";
            isValid = false;
        } else if (formData.reportesGenerales && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,()-]+$/.test(formData.reportesGenerales)) {
            errors.reportesGenerales = "Caracteres no permitidos";
            isValid = false;
        }

        return { isValid, errors };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cantidadCriasAbierta' || name === 'cantidadCriasOperculada' || name === 'cuadrosComida') {
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const validation = validateForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        try {
            const apiData = {
                location: `${parseFloat(formData.latitud)},${parseFloat(formData.longitud)}`,
                open_brood_frames: parseFloat(formData.cantidadCriasAbierta),
                capped_brood_frames: parseFloat(formData.cantidadCriasOperculada),
                queen_presence: formData.presenciaReina === 'Si' ? true : false,
                queen_color: formData.colorReina,
                origin: formData.origenReina,
                food_frames: parseFloat(formData.cuadrosComida),
                observations: formData.reportesGenerales,
                id_weather_conditions: {
                    temp_c: formData.temperatura_c.toString(),
                    temp_f: formData.temperatura_f.toString(),
                    text: formData.clima_texto,
                    wind_kph: formData.viento_kph.toString(),
                    pressure_mb: formData.presion_mb.toString(),
                    humidity_indices: formData.humedad.toString(),
                },
                status: formData.estado || 'Active',
                beekeeper_id: parseInt(localStorage.getItem('id_User')) || null,
            };

            const response = await fetch('http://localhost:8000/beehive/create-hive/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(apiData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al guardar los datos: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('Colmena creada exitosamente:', data);

            setShowPopup(true);

            setFormData((prev) => ({
                ...prev,
                cantidadCriasAbierta: '',
                cantidadCriasOperculada: '',
                presenciaReina: '',
                colorReina: '',
                origenReina: '',
                reportesGenerales: '',
                cuadrosComida: '',
            }));

        } catch (error) {
            console.error('Error al enviar datos:', error);
            setError(`Error al guardar los datos en el servidor: ${error.message}`);
        }
    };

    return (
        <Wrapper>
            <NavBar />
            <div className='container py-3'> {/* Reducido de py-4 */}
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-12 mb-3"> {/* Reducido de mb-4 */}
                        <FormContainer>
                            <Title>Crear Colmena</Title>
                            <Form onSubmit={handleSubmit}>
                                <Label htmlFor="cantidad-crias-abierta">Cantidad de Cuadros de Cría Abierta</Label>
                                <Input
                                    type="number"
                                    id="cantidad-crias-abierta"
                                    name="cantidadCriasAbierta"
                                    placeholder="Ingrese la cantidad de crías abierta"
                                    required
                                    value={formData.cantidadCriasAbierta}
                                    onChange={handleChange}
                                    onKeyDown={preventLetters}
                                />
                                {errors.cantidadCriasAbierta && <ErrorMessage>{errors.cantidadCriasAbierta}</ErrorMessage>}

                                <Label htmlFor="cantidad-crias-operculada">Cantidad de Cuadros de Cría Operculada</Label>
                                <Input
                                    type="number"
                                    id="cantidad-crias-operculada"
                                    name="cantidadCriasOperculada"
                                    placeholder="Ingrese la cantidad de crías operculada"
                                    required
                                    value={formData.cantidadCriasOperculada}
                                    onChange={handleChange}
                                    onKeyDown={preventLetters}
                                />
                                {errors.cantidadCriasOperculada && <ErrorMessage>{errors.cantidadCriasOperculada}</ErrorMessage>}

                                <Label htmlFor="cuadros-comida">Cuadros de Comida</Label>
                                <Input
                                    type="number"
                                    id="cuadros-comida"
                                    name="cuadrosComida"
                                    placeholder="Ingrese la cantidad de cuadros de comida"
                                    required
                                    value={formData.cuadrosComida}
                                    onChange={handleChange}
                                    onKeyDown={preventLetters}
                                />
                                {errors.cuadrosComida && <ErrorMessage>{errors.cuadrosComida}</ErrorMessage>}

                                <Label htmlFor="presencia-reina">Presencia de Reina</Label>
                                <Select
                                    id="presencia-reina"
                                    name="presenciaReina"
                                    value={formData.presenciaReina}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Si">Sí</option>
                                    <option value="No">No</option>
                                </Select>

                                <Label htmlFor="color-reina">Color de la Reina</Label>
                                <Select
                                    name="colorReina"
                                    value={formData.colorReina}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Amarilla">Amarilla</option>
                                    <option value="Verde">Verde</option>
                                    <option value="Roja">Roja</option>
                                    <option value="Negra">Negra</option>
                                </Select>

                                <Label htmlFor="origen-reina">Origen de la Reina</Label>
                                <Select
                                    id="origen-reina"
                                    name="origenReina"
                                    required
                                    value={formData.origenReina}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Europea">Europea</option>
                                    <option value="Angelita">Angelita</option>
                                    <option value="Africanita">Africanita</option>
                                </Select>

                                <Label htmlFor="estado">Estado</Label>
                                <Select
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un estado</option>
                                    <option value="Active">Activo</option>
                                </Select>

                                <Label htmlFor="reportes-generales">Reportes Generales</Label>
                                <Input
                                    type="text"
                                    id="reportes-generales"
                                    name="reportesGenerales"
                                    placeholder="Ingrese los reportes generales"
                                    required
                                    value={formData.reportesGenerales}
                                    onChange={handleChange}
                                />
                                {errors.reportesGenerales && <ErrorMessage>{errors.reportesGenerales}</ErrorMessage>}

                                <ButtonContainer>
                                    <Button type="submit">Crear</Button>
                                </ButtonContainer>
                            </Form>
                        </FormContainer>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Aside_Card className="mb-3" /> {/* Reducido de mb-4 */}
                        {clima && ubicacion && (
                            <ClimaInfo className='mt-3'> {/* Reducido de mt-4 */}
                                <h3>Datos del Clima</h3>
                                <DataItem>
                                    <img src={`https:${clima.icono}`} alt="clima" className="icon"/>
                                    <span className="label">Condición</span>
                                    <span className="value">{clima.clima_texto}</span>
                                </DataItem>
                                <DataItem>
                                    <img src="//cdn.weatherapi.com/weather/64x64/day/116.png" alt="temperatura" className="icon"/>
                                    <span className="label">Temperatura</span>
                                    <span className="value">{clima.temperatura_c}°C</span>
                                </DataItem>
                                <DataItem>
                                    <img src="//cdn.weatherapi.com/weather/64x64/day/119.png" alt="viento" className="icon"/>
                                    <span className="label">Viento</span>
                                    <span className="value">{clima.viento_kph} km/h</span>
                                </DataItem>
                                <DataItem>
                                    <img src="//cdn.weatherapi.com/weather/64x64/day/263.png" alt="humedad" className="icon"/>
                                    <span className="label">Humedad</span>
                                    <span className="value">{clima.humedad}%</span>
                                </DataItem>
                                <DataItem>
                                    <img src="//cdn.weatherapi.com/weather/64x64/day/116.png" alt="ubicación" className="icon"/>
                                    <span className="label">Ubicación</span>
                                    <span className="value">{ubicacion.latitude.toFixed(2)}, {ubicacion.longitude.toFixed(2)}</span>
                                </DataItem>
                            </ClimaInfo>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <PopupOverlay isVisible={showPopup}>
                <PopupContent isVisible={showPopup}>
                    <SuccessIcon />
                    <PopupTitle>Registro Exitoso</PopupTitle>
                    <p>La colmena ha sido creada exitosamente</p>
                    <PopupButton onClick={() => setShowPopup(false)}>Aceptar</PopupButton>
                </PopupContent>
            </PopupOverlay>
        </Wrapper>
    );
}

export default HivenRegister;