

import Styled from 'styled-components';
import React, {useState} from 'react'
import { Eye, EyeOff } from 'lucide-react';
import Header from '../Single_Components/Header'
import Footer from '../Single_Components/Footer';


const Wrapper = Styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; 
    width: 100%;
    margin: 0;
    padding: 0;
    
`;


const Logo = Styled.img`
    height: 50px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

const Title = Styled.h1`
    margin: 0;
    color: #4e342e;
    font-size: 2.3rem;
    text-align: center;
`;

const Main = Styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 1rem;
    background-image :url("src/img/fondo(1).svg");
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



//Estilos para el ojito de contraseña
const PasswordInputWrapper = Styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = Styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-right: 2.5rem;
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

const VisibilityToggle = Styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #4e342e;
`;



function ConfirmPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [visibility, setVisibility] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [status, setStatus] = useState({
    loading: false,
    error: '',
    passwordStrength: 0
  });

  // Validar fortaleza de contraseña
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      setStatus(prev => ({
        ...prev,
        passwordStrength: checkPasswordStrength(value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus(prev => ({ ...prev, error: 'Las contraseñas no coinciden' }));
      return;
    }

    if (status.passwordStrength < 3) {
      setStatus(prev => ({ ...prev, error: 'La contraseña no es suficientemente segura' }));
      return;
    }

    setStatus(prev => ({ ...prev, loading: true, error: '' }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("http://127.0.0.1:8000/users/password_reset_confirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.newPassword,
          password2: formData.confirmPassword
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      toast.success('¡Contraseña actualizada correctamente!');
      // Aquí podrías redirigir al usuario

    } catch (error) {
      toast.error(error.message || 'Error al actualizar la contraseña');
      setStatus(prev => ({ 
        ...prev, 
        error: 'Error al procesar la solicitud. Por favor, intente nuevamente.' 
      }));
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#ff4444', '#ffbb33', '#00C851', '#007E33'];
    return colors[status.passwordStrength - 1] || colors[0];
  };

  return (
    <Wrapper>
      <Header />
      <Main>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Nueva Contraseña</FormTitle>
            
            <Label>Nueva Contraseña</Label>
            <PasswordInputWrapper>
              <PasswordInput
                type={visibility.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder='Ingrese la nueva contraseña'
                disabled={status.loading}
              />
              <VisibilityToggle 
                type="button" 
                onClick={() => setVisibility(prev => ({
                  ...prev,
                  newPassword: !prev.newPassword
                }))}
              >
                {visibility.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </VisibilityToggle>
            </PasswordInputWrapper>

            {/* Indicador de fortaleza de contraseña */}
            {formData.newPassword && (
              <div style={{ 
                height: '4px', 
                backgroundColor: '#eee',
                borderRadius: '2px',
                overflow: 'hidden',
                marginTop: '5px'
              }}>
                <div style={{
                  width: `${(status.passwordStrength / 4) * 100}%`,
                  height: '100%',
                  backgroundColor: getPasswordStrengthColor(),
                  transition: 'all 0.3s'
                }} />
              </div>
            )}

            <Label>Confirmar Contraseña</Label>
            <PasswordInputWrapper>
              <PasswordInput
                type={visibility.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder='Confirme la nueva contraseña'
                disabled={status.loading}
              />
              <VisibilityToggle 
                type="button" 
                onClick={() => setVisibility(prev => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword
                }))}
              >
                {visibility.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </VisibilityToggle>
            </PasswordInputWrapper>

            {status.error && (
              <div style={{ color: '#ff4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {status.error}
              </div>
            )}

            <Button 
              disabled={status.loading || 
                !formData.newPassword || 
                !formData.confirmPassword || 
                status.passwordStrength < 3}
              style={{ 
                opacity: status.loading ? 0.7 : 1,
                cursor: status.loading ? 'not-allowed' : 'pointer'
              }}
            >
              {status.loading ? 'Procesando...' : 'Guardar'}
            </Button>
          </Form>
        </FormContainer>
      </Main>
      <Footer />
    </Wrapper>
  );
}

export default ConfirmPassword;