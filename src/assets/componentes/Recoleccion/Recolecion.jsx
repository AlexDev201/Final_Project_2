import Styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Single_Components/NavBar';
import Aside_Card from '../Single_Components/Aside';
import Footer from '../Single_Components/Footer';
const Wrapper = Styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    width: 100%;
    margin: 0;
    padding: 0;
`;



const Form = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.79rem;
    height: 30rem;
`;

const FormContainer = Styled.div`
    margin-top: 4px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 100%;
    max-width: 400px;
    border: 1px solid grey;
    height: 36rem;
    width: 350px;
`;

const FormTitle = Styled.h2`
    margin-bottom: 1rem;
    color: #4e342e;
    text-align: center;
`;

const Label = Styled.label`
    font-weight: 500;
    color: rgb(0, 0, 0);
    text-align: left;
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

const Button = Styled.button`
    background-color: #f9d77e;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #4e342e;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f8c150;
    }
`;


const ErrorMessage = Styled.span`
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: -0.5rem;
`;

//
function Recoleccion() {
    const { colmenaId } = useParams(); // Obtener el ID de la colmena desde la URL
    const beekeeper = localStorage.getItem("id_User")
    const token = localStorage.getItem('token')
    const [formDataRecoleccion, setFormDataRecoleccion] = useState({
        fechaRecoleccion: '',
        produccionMiel: '',
        produccionPolen: ''
    });

    const [errors, setErrors] = useState({
        fechaRecoleccion: '',
        produccionMiel: '',
        produccionPolen: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        //Prevenir letras en los siguientrs campos:
        if (name === 'produccionMiel' || name === 'produccionPolen') {
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setFormDataRecoleccion(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        } else {
            setFormDataRecoleccion(prev => ({
                ...prev,
                [name]: value
            }));
        }

        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    //Funcion para validaciones
    const validateForm = () => {
        const newErrors = {};
        const today = new Date();

        if (!formDataRecoleccion.fechaRecoleccion) {
            newErrors.fechaRecoleccion = 'La fecha es requerida';
        } else if (new Date(formDataRecoleccion.fechaRecoleccion) > today) {
            newErrors.fechaRecoleccion = 'La fecha no puede ser futura';
        }

        if (!formDataRecoleccion.produccionMiel) {
            newErrors.produccionMiel = 'La producción de miel es requerida';
        } else {
            const mielValue = parseFloat(formDataRecoleccion.produccionMiel);
            if (isNaN(mielValue)) {
                newErrors.produccionMiel = 'Debe ser un número válido';
            } else if (mielValue < 0) {
                newErrors.produccionMiel = 'La producción no puede ser negativa';
            } else if (mielValue > 1000) {
                newErrors.produccionMiel = 'La producción no puede exceder 1000';
            }
        }

        if (!formDataRecoleccion.produccionPolen) {
            newErrors.produccionPolen = 'La producción de polen es requerida';
        } else {
            const polenValue = parseFloat(formDataRecoleccion.produccionPolen);
            if (isNaN(polenValue)) {
                newErrors.produccionPolen = 'Debe ser un número válido';
            } else if (polenValue < 0) {
                newErrors.produccionPolen = 'La producción no puede ser negativa';
            } else if (polenValue > 1000) {
                newErrors.produccionPolen = 'La producción no puede exceder 1000';
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log('Datos validados:', formDataRecoleccion);
        
        //Limpiamos el formulario
        setFormDataRecoleccion({
            fechaRecoleccion: '',
            produccionMiel: '',
            produccionPolen: ''
        });
        setErrors({});

        //Conexion al backend

        try{
            const response = await fetch(`http://127.0.0.1:8000/harvesting/hive-harvesting/${colmenaId}/`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${token}`,

                },
                body: JSON.stringify({
                    harvest_date : formDataRecoleccion.fechaRecoleccion,
                    honey_production: formDataRecoleccion.produccionMiel, 
                    pollen_production: formDataRecoleccion.produccionPolen,
                    beekeeper : beekeeper,
                    hive_id : colmenaId
                })
            })

            const data = await response.json()

            if (response.ok){
                console.log("Recoleccion exitosa")
            }else{
                console.log("Datos incorrectos")
            }
        } catch(error){
            console.log("Error");
        }
    };

    return (
        <Wrapper>
            <NavBar>

                
            </NavBar>
        
            <div className='container py-4'>  
             <div className="row justify-content-center">
              <div className="col-lg-6 col-md-12 mb-4 mt-4 "> 

                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <FormTitle>Recolección</FormTitle>
                        
                        <Label>Fecha de recolección</Label>
                        <Input
                            type="date"
                            name="fechaRecoleccion"
                            value={formDataRecoleccion.fechaRecoleccion}
                            onChange={handleChange}
                            required
                        />
                        {errors.fechaRecoleccion && (
                            <ErrorMessage>{errors.fechaRecoleccion}</ErrorMessage>
                        )}

                        <Label>Producción de miel</Label>
                        <Input
                            type="number"
                            name="produccionMiel"
                            placeholder="Ingrese la producción de miel"
                            value={formDataRecoleccion.produccionMiel}
                            onChange={handleChange}
                            onKeyPress={preventLetters}
                            min="0"
                            step="0.01"
                            required
                        />
                        {errors.produccionMiel && (
                            <ErrorMessage>{errors.produccionMiel}</ErrorMessage>
                        )}

                        <Label>Producción de polen</Label>
                        <Input
                            type="number"
                            name="produccionPolen"
                            placeholder="Ingrese la producción de polen"
                            value={formDataRecoleccion.produccionPolen}
                            onChange={handleChange}
                            onKeyPress={preventLetters}
                            min="0"
                            step="0.01"
                            required
                        />
                        {errors.produccionPolen && (
                            <ErrorMessage>{errors.produccionPolen}</ErrorMessage>
                        )}

                        <Button type="submit">Enviar</Button>
                    </Form>
                </FormContainer>
                </div>
                <div className="col-lg-6 col-md-12 mt-4">

                     <Aside_Card >

                    
                      </Aside_Card>
                   </div>
                </div>
            </div>

            <Footer>


            </Footer>
        </Wrapper>
    );
}

export default Recoleccion;