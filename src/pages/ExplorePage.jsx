// src/pages/ExplorePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard'; // Componente que crearemos

const API_URL = 'http://localhost:8080/api/items';

// Implementación del componente de la Card
const SimpleItemCard = ({ item }) => {
    // Usamos el diseño de image_ec2717.png
    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px', backgroundColor: 'white' }}>
            <div style={{ backgroundColor: '#ccffcc', padding: '5px', borderRadius: '4px', textAlign: 'left', fontWeight: 'bold', color: '#1e7c4f', marginBottom: '10px' }}>
                {item.estado}
            </div>
            
            {/* Asumiendo que la imagen se sirve desde http://localhost:8080/uploads/ */}
            <img 
                src={`http://localhost:8080/uploads/${item.imagenPrincipal}`} 
                alt={item.titulo} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px auto', display: 'block' }} 
            />
            
            <h3 style={{ fontSize: '1.2em', margin: '10px 0 5px 0' }}>{item.titulo}</h3>
            <p style={{ color: '#38a169', fontWeight: 'bold', marginBottom: '10px' }}>{item.puntosAGanar} pts</p>
            
            {/* Botón Intercambiar (Acción protegida) */}
            <button 
                // En un escenario real, este botón llamaría a POST /api/items/{id}/reserve
                onClick={() => alert(`Reservar artículo ${item.id}`)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Intercambiar
            </button>
        </div>
    );
};

const ExplorePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                // Llama al endpoint público: GET /api/items (con paginación por defecto)
                const response = await axios.get(API_URL, {
                    params: { page: 0, size: 30 } // Usamos los parámetros de paginación que tienes
                });
                
                // response.data es un objeto Page<ItemDTO>, la lista está en 'content'
                setItems(response.data.content); 
                setLoading(false);
            } catch (err) {
                console.error("Error fetching items:", err);
                setError("Error al cargar las prendas. Revisa la conexión del servidor o el estado de la API.");
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Cargando prendas...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Explorar Prendas</h2>
            
            {/* Sección de Filtros (Simulación de image_ec2717.png) */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', overflowX: 'auto' }}>
                {['Todas', 'Vestidos', 'Camisas', 'Pantalones', 'Chaquetas', 'Accesorios'].map(cat => (
                    <button key={cat} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #ccc', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Listado de Artículos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {items.length > 0 ? (
                    items.map(item => (
                        <SimpleItemCard key={item.id} item={item} />
                    ))
                ) : (
                    <p>No hay prendas disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;