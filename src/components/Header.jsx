
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; 

const Header = () => {

    const { token, logout } = useContext(AuthContext); 
    
    const handleLogout = () => {
        logout();
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#2f573c', alignItems: 'center' }}>
          
            <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', textDecoration: 'none' }}>
                EcoSwap
            </Link>

         
            <div className="search-bar">
                <input type="text" placeholder="Buscar prendas..." style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>

       
            <nav>
                <Link to="/publish" style={{ marginRight: '15px', padding: '8px 15px', backgroundColor: '#89BC01', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
                    Inicia sesión
                </Link>

                {token ? (
                    <>
                        <Link to="/profile" style={{ marginRight: '15px', textDecoration: 'none', color: '#ffffff', fontWeight: 'bold' }}>
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