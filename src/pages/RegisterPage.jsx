// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService'; 


function RegisterPage() {
 
    const [nombre, setNombre] = useState('');
    const [mail, setMail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!nombre || !mail || !contrasena) {
            setError('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }

        try {
      
            await AuthService.register(nombre, mail, contrasena);
            
            alert('¡Registro exitoso! Por favor, inicia sesión con tus nuevas credenciales.');
            navigate('/login'); 

        } catch (err) {
       
            const errorMessage = err.response 
                ? err.response.data.message 
                : 'Error de conexión con el servidor.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h1>Regístrate en EcoSwap</h1>
            
            <form onSubmit={handleRegister} className="register-form">
          
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mail">Correo Electrónico</label>
                    <input
                        type="email"
                        id="mail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                        className="form-control"
                        minLength={6}
                    />
                </div>

                <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Registrando...' : 'Crear Cuenta'}
                </button>
            </form>

            <p className="login-link">
                ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
            </p>
        </div>
    );
}

export default RegisterPage;