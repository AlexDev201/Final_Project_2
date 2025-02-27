import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { useState } from 'react';
import NavBar from '../Single_Components/NavBar';
import Aside_Card from '../Single_Components/Aside';
import Footer from '../Single_Components/Footer';


const Wrapper = Styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; 
    width: 100%;
    margin: 0;
    padding: 0;
    
`;



const Form = Styled.form`
    display: flex;
     flex-direction: column;
     gap: 0.75rem;
`;


const FormContainer = Styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow:  0 0 20px 5px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 100%;
    max-width: 400px;
    border : 1px solid grey;
    height: 39rem;
    
`;

const FormTitle = Styled.h2`
    margin-bottom: 1rem;
    color: #4e342e;
    text-align: center;
`;


const FormLogin = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    
`;

const Label = Styled.label`
    font-weight: 500;
    color:rgb(0, 0, 0);
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





function Monitoreo(){

    const [formDataMonitoreo, setFormDataMonitoreo] = useState({
        fechaMonitoreo: '',
        observacionesReina: '',
        observacionesAlimento:'',
        ObservacionesReina: '',
        observacionesGenerales: '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataMonitoreo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://127.0.0.1:8000/monitoring/beehive-monitoring/",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    monitoring_date : formDataMonitoreo.fechaMonitoreo, 
                    queen_observations: formDataMonitoreo.observacionesReina, 
                    food_observations : formDataMonitoreo.observacionesAlimento,
                    general_observations: formDataMonitoreo.observacionesGenerales, 
                })
            })

            const data = await response.json()

            if (response.ok){
                console.log("Monitoreo exitoso")
            }else{
                console.log("Datos incorrectos")
            }
        } catch(error){
            console.log("Error");
        }
    }

    return (
        <Wrapper>
             <NavBar>


             </NavBar>
    
             <div className='container py-4'>  
              <div className="row justify-content-center">
               <div className="col-lg-6 col-md-12 mb-4 mt-4"> 

                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <FormTitle>Monitoreo</FormTitle>
    
                        <Label>Fecha de monitoreo</Label>
                        <Input type="date" required placeholder="Ingrese la fecha de recolección" 
                        onChange={handleChange} value={formDataMonitoreo.fechaMonitoreo} name='fechaMonitoreo'/>
    
                        <Label>Observaciones reina</Label>
                        <Input type="text" required placeholder="Ingrese las observaciones de la reina" 
                        onChange={handleChange} value={formDataMonitoreo.observacionesReina} name='observacionesReina'  />
    
                        <Label>Observación de alimentos</Label>
                        <Input type="text" required placeholder="Ingrese las observaciones de alimentos" 
                        onChange={handleChange} value={formDataMonitoreo.observacionesAlimento} name="observacionesAlimento" />
    
                        
    
                        <Label>Observaciones generales</Label>
                        <Input type="text" required placeholder="Ingrese las observaciones generales"
                        onChange={handleChange} value={formDataMonitoreo.observacionesGenerales} name="observacionesGenerales" />
    
                        <Button>Enviar</Button>
                    </Form>
                  </FormContainer>
                </div>
                <div className="col-lg-6 col-md-12 mt-4">

                    <Aside_Card>

                    
                    </Aside_Card>
                    </div>
                </div>
            </div>
           
           <Footer>

           </Footer>
        </Wrapper>
    );
}
export default Monitoreo;
