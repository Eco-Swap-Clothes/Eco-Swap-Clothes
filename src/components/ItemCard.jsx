
import React from 'react';

const ItemCard = ({ item }) => {

    if (!item) {
        return <div style={{ padding: '15px', border: '1px solid #eee' }}>Cargando artículo...</div>;
    }
    
    const handleIntercambiar = () => {
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
                
                <span style={{ 
                    fontSize: '0.9em', 
                    fontWeight: 'bold', 
                    color: '#666',
                    padding: '4px 10px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px'
                }}>
                    Talla M 
                </span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
    
                <img 
                    src={item.imagenUrl || `http://localhost:8080/uploads/${item.imagenPrincipal}` || 'https://via.placeholder.com/100x100?text=Prenda'}
                    alt={item.titulo} 
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
                />
            </div>

            <h3 style={{ fontSize: '1.2em', margin: '0 0 5px 0' }}>{item.titulo || 'Vestido Floral'}</h3>
            <p style={{ color: '#38a169', fontWeight: 'bold', margin: '0' }}>
                {item.puntosAGanar || 25} pts
            </p>
            
            
            <p style={{ margin: '5px 0 15px 0', fontSize: '0.9em', color: '#666' }}>
                👤 {item.usuarioNombre || 'Maria G.'} | ⭐ 4.8
            </p>
            
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