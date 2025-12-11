// src/pages/ProfilePage.jsx (CÓDIGO COMPLETO Y SEGURO)

import React, { useState, useEffect, useContext } from 'react';
import ItemCard from '../components/ItemCard.jsx'; // Nota la extensión .jsx
import { AuthContext } from '../context/AuthContext.jsx'; 
import UserService from '../services/UserService'; 
// NO necesitamos axios aquí ya que usamos UserService

const BASE_UPLOADS_URL = 'http://localhost:8080/uploads/';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [publishedItems, setPublishedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Obtenemos el token y la función logout del contexto
    // eslint-disable-next-line no-unused-vars
    const { token, logout } = useContext(AuthContext); 

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError("No autenticado. Por favor, inicia sesión.");
                setLoading(false);
                return;
            }

            try {
                // 1. Obtener Perfil usando UserService
                const userData = await UserService.getCurrentUser();
                setUser(userData);
                
                // 2. Obtener Prendas Publicadas
                const itemsData = await UserService.getMyPublishedItems();
                setPublishedItems(itemsData); 

                setLoading(false);
            } catch (err) {
                console.error("Error al cargar el perfil:", err.message);
                
                if (err.message && err.message.includes("No autenticado")) {
                     setError("Sesión expirada o inválida. Intenta iniciar sesión de nuevo.");
                     // Si la sesión expira, podrías llamar a logout() aquí
                } else {
                     setError("Error al cargar el perfil o las prendas. Revisa el backend.");
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [token]); 

    // --- MANEJO DE ESTADOS ---
    if (loading) return <p style={{ textAlign: 'center' }}>Cargando perfil...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

    // CLAVE: Evita errores de "Cannot read properties of null"
    if (!user) {
        return <p style={{ textAlign: 'center', color: 'orange' }}>No se pudo cargar la información del usuario.</p>;
    }
    
    // --- Lógica de Extracción de Datos (Ahora segura) ---
    const totalPuntos = user.puntos || 0;
    const itemsPublicadosCount = publishedItems.length || 0;
    const valoracion = user.valoracion || 0;
    
    // Construcción de la URL de la imagen de perfil
    const profileImageUrl = user.imagenPerfil 
        ? `${BASE_UPLOADS_URL}${user.imagenPerfil}` 
        : '/default-avatar.png'; // Debe existir en la carpeta /public

    return (
        <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
            {/* Cabecera del Perfil */}
            <div style={{ background: '#38a169', color: 'white', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    
                    {/* Contenedor de la Imagen de Perfil */}
                    <img 
                        src={profileImageUrl}
                        alt={user.nombre}
                        style={{ 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%', 
                            objectFit: 'cover', 
                            marginRight: '15px',
                            border: '3px solid white' 
                        }} 
                    />

                    <div>
                        <h2 style={{ margin: '0' }}>{user.nombre}</h2>
                        <p style={{ margin: '0', fontSize: '0.9em' }}>Correo: {user.mail}</p>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>⭐ {valoracion} Valoración</p>
                    </div>
                </div>
                
                <div style={{ background: '#8bc34a', padding: '10px 15px', borderRadius: '4px', textAlign: 'center' }}>
                    <p style={{ margin: '0', fontSize: '0.8em', fontWeight: 'bold' }}>Tus puntos</p>
                    <h3 style={{ margin: '0', fontSize: '1.8em' }}>{totalPuntos}</h3>
                </div>
            </div>

            {/* Métricas */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                     <div>
                         <p style={{ color: '#38a169', fontWeight: 'bold', margin: '0' }}>✅ Prendas publicadas</p>
                         <h3 style={{ margin: '5px 0' }}>{itemsPublicadosCount}</h3>
                     </div>
                     <div> 
                         <p style={{ color: '#38a169', fontWeight: 'bold', margin: '0' }}>📈 Intercambios</p>
                         <h3 style={{ margin: '5px 0' }}>{user.intercambios || 0}</h3>
                     </div>
                </div>
             </div>

            {/* Mis Prendas Publicadas */}
            <h2 style={{ marginTop: '30px', borderBottom: '2px solid #38a169', paddingBottom: '5px' }}>Mis Prendas Publicadas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {publishedItems.length > 0 ? (
                    publishedItems.map(item => (
                        <ItemCard key={item.id} item={item} /> 
                    ))
                ) : (
                    <p>Aún no has publicado ninguna prenda.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;