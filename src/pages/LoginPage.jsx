
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext.jsx'; 

const LoginPage = () => {
    const [mail, setMail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { login } = useContext(AuthContext); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!mail || !contrasena) {
            setMessage('Por favor, ingresa tu email y contraseña.');
            return;
        }

        try {
   
            // eslint-disable-next-line no-unused-vars
            const token = await login(mail, contrasena);
            
            setMessage('Inicio de sesión exitoso.');
       
            navigate('/profile'); 
            
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            
            if (error.response && error.response.status === 401) {
                 setMessage('Error: Credenciales inválidas. Email o contraseña incorrectos.');
            } else if (error.response && error.response.status === 500) {
                 setMessage('Error interno del servidor. Revisa el backend (500 Internal Server Error).');
            } else {
                 setMessage('Error al intentar iniciar sesión. Revisa la conexión del servidor.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '15px' }}>
                    Iniciar Sesión
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default LoginPage;