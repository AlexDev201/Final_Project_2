import React, { useState, useRef } from 'react';
import Styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';
import Admin_Nav_Bar from '../Single_Components/Admin_Nav_Bar';
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
    font-size: 1.7rem; /* Reducido ligeramente */
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

// Password input styling (mantenido igual)
const PasswordInputWrapper = Styled.div`
    position: relative;
    width: 100%;
`;

const PasswordToggleIcon = Styled.div`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #4e342e;
`;

// Estilos de popup (mantenidos igual)
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

function UserRegister() {
    // Variable para el reseteo del formulario
    const formRef = useRef(null);
    const TodayDate = new Date();
    const assignedDate = TodayDate.toISOString().split('T')[0];

    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});

    // Guardamos la información del formulario
    const [formDataRegister, setFormDataRegister] = useState({
        username: '',
        nombreApicultor: '',
        apellidoApicultor: '',
        identificacion: '',
        password: '',
        correo: '',
        telefono: '',
        fechaNacimiento: '',
        estado: '',
        nombreContactoEmergencia: '',
        contactoEmergencia: '',
        rol: ''
    });

    // State for password visibility
    const [showPassword, setShowPassword] = useState({
        password: false
    });

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataRegister(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear errors when field is edited
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validaciones mantenidas igual
    const validateForm = (data) => {
        let errors = {};
        let isValid = true;
    
        // Validación de cédula colombiana
        const cedulaRegex = /^[0-9]{8,10}$/;
        if (data.identificacion && !cedulaRegex.test(data.identificacion)) {
            errors.identificacion = "La cédula debe contener entre 8 y 10 dígitos numéricos";
            isValid = false;
        }
    
        // Validación de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (data.correo && !emailRegex.test(data.correo)) {
            errors.correo = "Formato de correo inválido";
            isValid = false;
        }
    
        // Validación de teléfono
        const telefonoRegex = /^[0-9]{7,10}$/;
        if (data.telefono && !telefonoRegex.test(data.telefono)) {
            errors.telefono = "El teléfono debe contener entre 7 y 10 dígitos";
            isValid = false;
        }
    
        // Validación de contacto de emergencia
        if (data.contactoEmergencia && !telefonoRegex.test(data.contactoEmergencia)) {
            errors.contactoEmergencia = "El contacto debe contener entre 7 y 10 dígitos";
            isValid = false;
        }
    
        // Validación de nombres
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
        if (data.nombreApicultor && !nombreRegex.test(data.nombreApicultor)) {
            errors.nombreApicultor = "El nombre solo debe contener letras y espacios";
            isValid = false;
        }
    
        if (data.apellidoApicultor && !nombreRegex.test(data.apellidoApicultor)) {
            errors.apellidoApicultor = "El apellido solo debe contener letras y espacios";
            isValid = false;
        }
    
        if (data.nombreContactoEmergencia && !nombreRegex.test(data.nombreContactoEmergencia)) {
            errors.nombreContactoEmergencia = "El nombre solo debe contener letras y espacios";
            isValid = false;
        }
    
        // Validación de contraseña
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (data.password && !passwordRegex.test(data.password)) {
            errors.password = "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números";
            isValid = false;
        }
    
        // Validación de username
        const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
        if (data.username && !usernameRegex.test(data.username)) {
            errors.username = "El username debe tener entre 3 y 20 caracteres y solo puede contener letras, números, puntos, guiones y guiones bajos";
            isValid = false;
        }
    
        return { isValid, errors };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            alert('No se encontró el access token');
            return;
        }

        // Validate form
        const validation = validateForm(formDataRegister);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        // Crear el objeto de datos que espera el backend
        const userData = {
            username: formDataRegister.username,
            first_name: formDataRegister.nombreApicultor,
            last_name: formDataRegister.apellidoApicultor,
            identifications: formDataRegister.identificacion,
            password: formDataRegister.password,
            email: formDataRegister.correo,
            phone: formDataRegister.telefono,
            assignment_date: assignedDate,
            birth_date: formDataRegister.fechaNacimiento,
            state: formDataRegister.estado,
            emergency_contact_name: formDataRegister.nombreContactoEmergencia,
            emergency_contact_phone: formDataRegister.contactoEmergencia,
            role: formDataRegister.rol
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/beekeepers/create-beekeeper/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.Error || 'Error en el registro');
            }

            const data = await response.json();
            
            // Si el registro es exitoso
            setShowPopup(true);
            
            // Limpiar el formulario
            setFormDataRegister({
                username: '',
                nombreApicultor: '',
                apellidoApicultor: '',
                identificacion: '',
                password: '',
                correo: '',
                telefono: '',
                fechaNacimiento: '',
                estado: '',
                contactoEmergencia: '',
                nombreContactoEmergencia: '',
                rol: ''
            });

        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
        
    return (
        <Wrapper>
            <Admin_Nav_Bar />
            <div className='container py-3'> {/* Reducido de py-4 */}
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-12 mb-3"> {/* Reducido de mb-4 */}
                        <FormContainer>
                            <Title>Crear Apicultor</Title>
                            <Form onSubmit={handleSubmit} ref={formRef}>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type='text'
                                    id="username"
                                    name='username'
                                    placeholder='Ingrese el username del apicultor'
                                    value={formDataRegister.username}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                                
                                <Label htmlFor="nombreApicultor">Nombre del apicultor</Label>
                                <Input
                                    type='text'
                                    id="nombreApicultor"
                                    name='nombreApicultor'
                                    placeholder='Ingrese el nombre del apicultor'
                                    value={formDataRegister.nombreApicultor}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.nombreApicultor && <ErrorMessage>{errors.nombreApicultor}</ErrorMessage>}

                                <Label htmlFor="apellidoApicultor">Apellido del apicultor</Label>
                                <Input
                                    type='text'
                                    id="apellidoApicultor"
                                    name='apellidoApicultor'
                                    placeholder='Ingrese el apellido del apicultor'
                                    value={formDataRegister.apellidoApicultor}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.apellidoApicultor && <ErrorMessage>{errors.apellidoApicultor}</ErrorMessage>}
                                
                                <Label htmlFor="identificacion">Identificación</Label>
                                <Input
                                    type='number'
                                    id="identificacion"
                                    name='identificacion'
                                    placeholder='Ingrese la identificación del apicultor'
                                    value={formDataRegister.identificacion}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.identificacion && <ErrorMessage>{errors.identificacion}</ErrorMessage>}
                                
                                <Label htmlFor="password">Contraseña</Label>
                                <PasswordInputWrapper>
                                    <Input
                                        type={showPassword.password ? 'text' : 'password'}
                                        id="password"
                                        name='password'
                                        placeholder='Ingrese la contraseña del apicultor'
                                        value={formDataRegister.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <PasswordToggleIcon onClick={() => togglePasswordVisibility('password')}>
                                        {showPassword.password ? <EyeOff size={18} /> : <Eye size={18} />} {/* Reducido size */}
                                    </PasswordToggleIcon>
                                </PasswordInputWrapper>
                                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

                                <Label htmlFor="correo">Correo</Label>
                                <Input
                                    type='email'
                                    id="correo"
                                    name='correo'
                                    placeholder='Ingrese el correo del apicultor'
                                    value={formDataRegister.correo}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.correo && <ErrorMessage>{errors.correo}</ErrorMessage>}

                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input
                                    type='tel'
                                    id="telefono"
                                    name='telefono'
                                    placeholder='Ingrese el número del apicultor'
                                    value={formDataRegister.telefono}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.telefono && <ErrorMessage>{errors.telefono}</ErrorMessage>}

                                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                                <Input
                                    type='date'
                                    id="fechaNacimiento"
                                    name='fechaNacimiento'
                                    value={formDataRegister.fechaNacimiento}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.fechaNacimiento && <ErrorMessage>{errors.fechaNacimiento}</ErrorMessage>}

                                <Label htmlFor="estado">Estado</Label>
                                <Select
                                    id="estado"
                                    name='estado'
                                    value={formDataRegister.estado}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un estado</option>
                                    <option value="Active">Activo</option>
                                </Select>

                                <Label htmlFor="nombreContactoEmergencia">Nombre de contacto de emergencia</Label>
                                <Input
                                    type='text'
                                    id="nombreContactoEmergencia"
                                    placeholder='Ingrese el nombre del contacto de emergencia' 
                                    name='nombreContactoEmergencia'
                                    required
                                    value={formDataRegister.nombreContactoEmergencia}
                                    onChange={handleChange}
                                />
                                {errors.nombreContactoEmergencia && <ErrorMessage>{errors.nombreContactoEmergencia}</ErrorMessage>}
                                
                                <Label htmlFor="contactoEmergencia">Contacto de emergencia</Label>
                                <Input
                                    type='tel'
                                    id="contactoEmergencia"
                                    name='contactoEmergencia'
                                    placeholder='Ingrese el contacto de emergencia' 
                                    required
                                    value={formDataRegister.contactoEmergencia}
                                    onChange={handleChange}
                                />
                                {errors.contactoEmergencia && <ErrorMessage>{errors.contactoEmergencia}</ErrorMessage>}

                                <Label htmlFor="rol">Rol</Label>
                                <Select
                                    id="rol"
                                    name='rol'
                                    value={formDataRegister.rol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un rol</option>
                                    <option value="beekeeper">Apicultor</option>
                                </Select>

                                <ButtonContainer>
                                    <Button type="submit">Crear</Button>
                                </ButtonContainer>
                            </Form>
                        </FormContainer>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Aside_Card className="mb-3" /> {/* Reducido de mb-4 */}
                    </div>
                </div>
            </div>
            <Footer />

            <PopupOverlay isVisible={showPopup}>
                <PopupContent isVisible={showPopup}>
                    <SuccessIcon />
                    <PopupTitle>Registro Exitoso</PopupTitle>
                    <p>El apicultor ha sido registrado exitosamente</p>
                    <PopupButton onClick={() => setShowPopup(false)}>Aceptar</PopupButton>
                </PopupContent>
            </PopupOverlay>
        </Wrapper>
    );
}

export default UserRegister;