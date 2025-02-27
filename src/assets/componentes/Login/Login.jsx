import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Single_Components/Header";
import Footer from "../Single_Components/Footer";
import { Navigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; 
    width: 100%;
    margin: 0;
    padding: 0;
`;



const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 1rem;
    background-image: url("src/img/fondo(1).svg");
    background-size: cover;
    background-position: center;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

const LoginContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    padding: 2.5rem;
    width: 100%;
    max-width: 400px;
    border: 1px solid grey;
    height: 250px;
    @media (max-width: 480px) {
        padding: 1rem;
        max-width: 90%;
    }
`;

const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ffcc80;
    border-radius: 6px;
    background-color: rgb(243, 243, 242);
    color: #4e342e;
    font-size: 0.9rem;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #ffb300;
    }
`;

const Button = styled.button`
    background-color: #f9d77e;
    border: none;
    padding: 0.6rem;
    border-radius: 6px;
    cursor: pointer;
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: rgb(0, 0, 0);
    text-align: center;
    font-size: 0.7rem;
    margin-top: 0.5rem;

    &:hover {
        color: #f79d60;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    text-align: center;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    

    

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:8000/users/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (!data.accessToken || !data.refreshToken) {
                    throw new Error("Tokens no recibidos correctamente.");
                }
                
                // Guardar información de autenticación
                localStorage.setItem("token", data.accessToken);
                sessionStorage.setItem("username", data.username);
                localStorage.setItem('role', data.role);
                localStorage.setItem('id_User', data.id_User);

               

                // Redireccionar según el rol
                if (data.role === 'admin') {
                    navigate('/ViewApicultor'); // Acceso completo
                } else if (data.role === 'beekeeper') {
                    navigate('/Dashboard'); // Vista limitada
                }
            } else {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (err) {
            setError(err.message || "Error de conexión. Por favor, intente nuevamente.");
            console.error("Error durante el inicio de sesión:", err);
        } finally {
            setIsLoading(false);
        }
    };

    


    return (
        <Wrapper>
            
            <Header>

                
            </Header>

            <Main>
                <LoginContainer>
                    <FormLogin onSubmit={handleLogin}>
                        <Input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <Input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Cargando..." : "Iniciar Sesión"}
                        </Button>
                        <StyledLink to="/RecuperarContraseña">
                            ¿Olvidaste tu contraseña?
                        </StyledLink>
                    </FormLogin>
                </LoginContainer>
            </Main>

            <Footer>

            </Footer>
        </Wrapper>
    );
};

export default Login;
