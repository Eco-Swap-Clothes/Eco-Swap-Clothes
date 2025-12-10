// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '50px 20px', 
            backgroundColor: '#e0ffe0', // Fondo verde claro similar al diseño
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Título y Pregunta */}
            <h1 style={{ fontSize: '3em', color: '#2f4f4f', marginBottom: '20px' }}>
                ¿Tu armario pide a gritos un cambio?
            </h1>

            {/* Descripción */}
            <p style={{ maxWidth: '700px', fontSize: '1.2em', color: '#4f6f6f', marginBottom: '40px' }}>
                Esta plataforma te permite publicar tu ropa usada, conseguir puntos y usarlos para obtener nuevas prendas de otros miembros de la comunidad. Es la manera más sencilla, económica y 100% sostenible de sumarte al consumo consciente.
            </p>

            {/* Botones de CTA */}
            <div>
                <Link to="/explore" style={{ 
                    padding: '12px 25px', 
                    backgroundColor: '#8bc34a', // Verde principal
                    color: 'white', 
                    borderRadius: '5px', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    marginRight: '20px'
                }}>
                    Empieza a intercambiar ahora
                </Link>
                
                <Link to="/explore" style={{ 
                    padding: '12px 25px', 
                    backgroundColor: 'white', 
                    color: '#2f4f4f', 
                    borderRadius: '5px', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    border: '1px solid #ccc'
                }}>
                    Explorar Prendas
                </Link>
            </div>
        </div>
    );
};

export default HomePage;