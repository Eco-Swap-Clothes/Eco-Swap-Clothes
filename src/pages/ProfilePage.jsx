// src/pages/ProfilePage.jsx (CÓDIGO COMPLETO)
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard'; // Para listar Mis Prendas Publicadas
import { AuthContext } from '../context/AuthContext.jsx'; // Usar la extensión .jsx
import AuthService from '../services/AuthService'; 

const API_URL = 'http://localhost:8080/api/users';
const ITEMS_URL = 'http://localhost:8080/api/items';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [publishedItems, setPublishedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Usamos el contexto para asegurarnos de que el token está disponible
    const { token } = useContext(AuthContext); 

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                // Si la PrivateRoute falla, esto debería ser un fallback
                setError("No autenticado. Por favor, inicia sesión.");
                setLoading(false);
                return;
            }

            try {
                const headers = { Authorization: `Bearer ${token}` };

                // 1. Obtener Perfil (GET /api/users/me)
                const profileResponse = await axios.get(`${API_URL}/me`, { headers });
                const userData = profileResponse.data;
                setUser(userData);
                
                // 2. Obtener Prendas Publicadas (Asumo endpoint GET /api/items?userId={id})
                // Esto podría ser un GET /api/users/{userId}/items en tu backend
                const itemsResponse = await axios.get(`${ITEMS_URL}?userId=${userData.id}`, { headers });
                
                // Asumo que tu backend devuelve la lista en 'content' si usa Spring Data Page
                setPublishedItems(itemsResponse.data.content || itemsResponse.data); 

                setLoading(false);
            } catch (err) {
                console.error("Error al cargar el perfil:", err.response || err);
                // 403 Forbidden significa que el token no es válido o no tiene permiso
                setError(err.response?.status === 403 
                    ? "Acceso denegado. Token inválido o expirado. Intenta iniciar sesión de nuevo."
                    : "Error al cargar el perfil. Revisa la conexión del backend (GET /api/users/me).");
                setLoading(false);
            }
        };
        fetchData();
    }, [token]); // Dependencia del token para recargar si cambia

    if (loading) return <p style={{ textAlign: 'center' }}>Cargando perfil...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

    // Datos por defecto (si el backend no los provee)
    const nombreUsuario = user.nombre || 'Usuario Demo';
    const totalPuntos = user.puntos || 150;
    const itemsPublicadosCount = publishedItems.length || 12;
    const totalIntercambios = user.intercambios || 8; 
    const valoracion = user.valoracion || 4.9;
    
    return (
        <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
            {/* Cabecera del Perfil (image_ec26d5.png) */}
            <div style={{ background: '#38a169', color: 'white', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '10px', marginRight: '15px', display: 'flex' }}>
                        <span style={{ fontSize: '30px', color: '#38a169' }}>👤</span>
                    </div>
                    <div>
                        <h2 style={{ margin: '0' }}>{nombreUsuario}</h2>
                        <p style={{ margin: '0', fontSize: '0.9em' }}>Miembro desde {user.fechaCreacion || 'enero 2024'}</p>
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
                        <h3 style={{ margin: '5px 0' }}>{totalIntercambios}</h3>
                    </div>
                </div>
            </div>

            {/* Mis Prendas Publicadas */}
            <h2 style={{ marginTop: '30px', borderBottom: '2px solid #38a169', paddingBottom: '5px' }}>Mis Prendas Publicadas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {publishedItems.length > 0 ? (
                    publishedItems.map(item => (
                        // Asumo que los items devueltos son ItemDTOs válidos
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