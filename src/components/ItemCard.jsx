// src/components/ItemCard.jsx (CÓDIGO COMPLETO Y MEJORADO)
import React from 'react';

const ItemCard = ({ item }) => {
    // Si 'item' no está definido, mostramos un estado de carga o error.
    if (!item) {
        return <div style={{ padding: '15px', border: '1px solid #eee' }}>Cargando artículo...</div>;
    }
    
    // Función de ejemplo para el botón (la lógica real requiere un hook y token)
    const handleIntercambiar = () => {
        // Esta acción debe llamar a POST /api/items/{id}/reserve (Requiere autenticación)
        alert(`Intentando reservar: ${item.titulo}. Necesitas estar logueado.`);
    };

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            margin: '10px', 
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            
            {/* Cabecera de Estado (image_ec2717.png) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ 
                    backgroundColor: '#38a169', 
                    color: 'white', 
                    padding: '4px 10px', 
                    borderRadius: '4px',
                    fontWeight: 'bold'
                }}>
                    {item.estado || 'Excelente'}
                </span>
                
                {/* Talla (ejemplo) */}
                <span style={{ 
                    fontSize: '0.9em', 
                    fontWeight: 'bold', 
                    color: '#666',
                    padding: '4px 10px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px'
                }}>
                    Talla M {/* Debes obtener la talla de item.talla si existe */}
                </span>
            </div>

            {/* Imagen de la Prenda */}
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                {/* Asumimos que el backend proporciona la URL de la imagen */}
                <img 
                    src={item.imagenUrl || `http://localhost:8080/uploads/${item.imagenPrincipal}` || 'https://via.placeholder.com/100x100?text=Prenda'}
                    alt={item.titulo} 
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
                />
            </div>

            {/* Título y Puntos */}
            <h3 style={{ fontSize: '1.2em', margin: '0 0 5px 0' }}>{item.titulo || 'Vestido Floral'}</h3>
            <p style={{ color: '#38a169', fontWeight: 'bold', margin: '0' }}>
                {item.puntosAGanar || 25} pts
            </p>
            
            {/* Datos del Vendedor (Simulación) */}
            <p style={{ margin: '5px 0 15px 0', fontSize: '0.9em', color: '#666' }}>
                👤 {item.usuarioNombre || 'Maria G.'} | ⭐ 4.8
            </p>
            
            {/* Botón Intercambiar */}
            <button 
                onClick={handleIntercambiar}
                style={{ width: '100%', padding: '10px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                Intercambiar
            </button>
        </div>
    );
};

export default ItemCard;