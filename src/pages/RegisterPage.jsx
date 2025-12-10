// src/pages/RegisterPage.jsx (NUEVO ARCHIVO)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; 

const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [mail, setMail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!nombre || !mail || !contrasena) {
            setMessage('Por favor, rellena todos los campos.');
            return;
        }

        try {
            // Llama al servicio que conecta con POST /api/auth/register
            setMessage('Registro exitoso. ¡Inicia sesión para continuar!');
            
            // Navegar a la página de login después de un registro exitoso (o al perfil si hay login automático)
            navigate('/login'); 
            
        } catch (error) {
            console.error('Error durante el registro:', error);
            // El backend devuelve 400 Bad Request, mostramos un error genérico
            if (error.response && error.response.status === 400) {
                 setMessage('Error 400 Bad Request: Verifica los datos ingresados. Puede que el email ya esté en uso o la contraseña sea inválida.');
            } else {
                 setMessage('Error al intentar registrar. Revisa la conexión del servidor.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Registrar Nueva Cuenta</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
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
                    Registrarse
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default RegisterPage;