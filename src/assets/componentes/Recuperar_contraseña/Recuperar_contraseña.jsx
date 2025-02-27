import React from 'react';
import { useState } from 'react';
import Styled from "styled-components";
import { Link } from 'react-router-dom';
import Header from '../Single_Components/Header';

const Wrapper = Styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; 
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
`;


const Main = Styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background: radial-gradient(circle, white, white);
    padding: 1rem;
`;

const Container = Styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 100%;
    max-width: 400px;
    border: 1px solid grey;
`;

const FormTitle = Styled.h2`
    margin-bottom: 1rem;
    color: black;
    text-align: center;
`;

const Form = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Label = Styled.label`
    font-weight: 500;
    color: black;
    margin-bottom: 0.23rem;
    padding-bottom: 0.23rem;
`;

const Input = Styled.input`
    width: 100%;
    padding: 0.2rem;
    border: 1px solid #ffcc80;
    border-radius: 6px;
    background-color: #fffde7;
    color: #4e342e;
    font-size: 0.9rem;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #ffb300;
    }
`;

const StyledLink = Styled(Link)`
    text-decoration: none;
    color: rgb(0, 0, 0);
    text-align: center;
    font-size: 0.7rem;
    margin-top: 0.5rem;

    &:hover {
        color: #f79d60;
    }
`;

const Button = Styled.button`
    background-color: #f9d77e;
    border: none;
    padding: 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background-color 0.3s;
    width: 100%;
    margin-top: 0.5rem;

    &:hover {
        background-color: #f79d60;
    }

    &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
`;

const ErrorMessage = Styled.p`
    color: #d32f2f;
    font-size: 0.8rem;
    margin: 0.5rem 0;
    text-align: center;
`;

const Footer = Styled.footer`
    background-color: #f9d77e;
    color: #4e342e;
    text-align: center;
    padding: 0;
    font-size: 0.75rem;
    border-radius: 12px;
`;

const RecuperarContraseña = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        // Validación básica del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, ingrese un correo electrónico válido');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/users/password_reset/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('email', email);
                setMessage('Se ha enviado un código a tu correo electrónico');
                setTimeout(() => {
                    window.location.href = 'ConfirmPassword';
                }, 2000);
            } else {
                setError(data.message || "Error al enviar el correo");
            }
        } catch (err) {
            setError("Error de conexión. Por favor, intente nuevamente.");
            console.error("Error al enviar el correo", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <Header>
                
            </Header>

            <Main className="main">
                <Container className="login-container">
                    <FormTitle>Recuperar Contraseña</FormTitle>
                    <Form className="form-login" onSubmit={handleSubmit}>
                        <Label htmlFor="correo" className="label">Correo electrónico</Label>
                        <Input
                            type="email"
                            id="correo"
                            name="correo"
                            placeholder="Ingrese su correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            className="input"
                        />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
                        <Button 
                            type="submit" 
                            className="button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar correo'}
                        </Button>
                        <StyledLink to="/ConfirmCell">¿Olvidaste tu correo?</StyledLink>
                    </Form>
                </Container>
            </Main>

            <Footer className="footer">
                <h2>Colmenares del Eje</h2>
                <p>@2025 Todos los derechos reservados</p>
            </Footer>
        </Wrapper>
    );
};

export default RecuperarContraseña;