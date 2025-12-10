// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; // Importar el contexto

const Header = () => {
    // Aquí puedes usar el hook useAuth si lo exportaste directamente, o useContext
    const { token, logout } = useContext(AuthContext); 
    
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#e0ffe0', alignItems: 'center' }}>
            {/* Logo/Título (EcoSwap) */}
            <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e7c4f', textDecoration: 'none' }}>
                EcoSwap
            </Link>

            {/* Búsqueda (Asumiendo que el campo de búsqueda existe) */}
            <div className="search-bar">
                <input type="text" placeholder="Buscar prendas..." style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>

            {/* Botones de Navegación */}
            <nav>
                {/* Botón Publicar Ropa */}
                <Link to="/publish" style={{ marginRight: '15px', padding: '8px 15px', backgroundColor: '#38a169', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
                    Publicar Ropa
                </Link>

                {/* Botones de Auth/Perfil */}
                {token ? (
                    <>
                        <Link to="/profile" style={{ marginRight: '15px', textDecoration: 'none', color: '#1e7c4f', fontWeight: 'bold' }}>
                            Mi Perfil
                        </Link>
                        <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <Link to="/register" style={{ padding: '8px 15px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', textDecoration: 'none', color: '#1e7c4f' }}>
                        Registrarse
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;