// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService'; 
// Importa cualquier componente de UI que uses (p. ej., Footer, Navbar)

function RegisterPage() {
    // --- ESTADO LOCAL ---
    const [nombre, setNombre] = useState('');
    const [mail, setMail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Hook para la navegación
    const navigate = useNavigate();

    // --- MANEJADOR DE ENVÍO ---
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Simple validación básica (adicional a la del DTO del backend)
        if (!nombre || !mail || !contrasena) {
            setError('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }

        try {
            // 1. Llama al servicio de registro (ya corregido en AuthService.js)
            await AuthService.register(nombre, mail, contrasena);
            
            // [CORRECCIÓN CLAVE AQUÍ]
            // El registro fue exitoso. Como el backend no devuelve el token,
            // redirigimos al usuario a la página de login para que inicie sesión.
            alert('¡Registro exitoso! Por favor, inicia sesión con tus nuevas credenciales.');
            navigate('/login'); 

        } catch (err) {
            // Manejo de errores de la API (por ejemplo, correo ya existe - 409 CONFLICT)
            // Tu GlobalExceptionHandler.java envía el error en err.response.data.message
            const errorMessage = err.response 
                ? err.response.data.message 
                : 'Error de conexión con el servidor.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // --- RENDERIZADO DEL COMPONENTE ---
    return (
        <div className="register-container">
            <h1>Regístrate en EcoSwap</h1>
            
            <form onSubmit={handleRegister} className="register-form">
                
                {/* Mensaje de Error */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Campo Nombre */}
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

                {/* Campo Email */}
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

                {/* Campo Contraseña */}
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                        className="form-control"
                        minLength={6} // Coincide con la validación de UsuarioRegistroDTO
                    />
                </div>

                {/* Botón de Envío */}
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