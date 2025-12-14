/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService'; 

const API_BASE_URL = 'http://localhost:8080/api';
const ITEMS_ENDPOINT = `${API_BASE_URL}/items`;

const SimpleItemCard = ({ item }) => {

    const UPLOADS_BASE_URL = 'http://localhost:8080/uploads/';
    const isAuthenticated = AuthService.getCurrentToken() !== null; 

    const handleReserve = (itemId) => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para reservar un artículo.");
          
        } else {
        
            alert(`Reservando artículo ${itemId}... (Requiere implementación del servicio)`);
        }
    }

    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px', backgroundColor: 'white' }}>
         
            <img 
                src={item.imagenPrincipal ? `${UPLOADS_BASE_URL}${item.imagenPrincipal}` : '/default-item.png'} 
                alt={item.titulo} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', margin: '10px 0', display: 'block' }} 
            />
            
            <h3 style={{ fontSize: '1.2em', margin: '10px 0 5px 0' }}>{item.titulo}</h3>
            <p style={{ color: '#38a169', fontWeight: 'bold', marginBottom: '10px' }}>{item.puntosAGanar} pts</p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>Dueño: {item.duenoNombre}</p>
            
            <button 
                onClick={() => handleReserve(item.id)}
                style={{ 
                    width: '100%', padding: '10px', 
                    backgroundColor: isAuthenticated ? '#38a169' : '#ccc', 
                    color: 'white', border: 'none', borderRadius: '4px', 
                    cursor: isAuthenticated ? 'pointer' : 'not-allowed',
                    marginTop: '10px'
                }}
            >
                {isAuthenticated ? 'Intercambiar' : 'Inicia Sesión'}
            </button>
        </div>
    );
};

const ExplorePage = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [categoriaFiltro, setCategoriaFiltro] = useState(''); 
    const [fechaDesdeFiltro, setFechaDesdeFiltro] = useState(''); 

    const [currentPage, setCurrentPage] = useState(0); 
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 12; 

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
       
        const params = { 
            page: currentPage, 
            size: pageSize 
        };

        if (categoriaFiltro) {
            params.categoria = categoriaFiltro;
        }
        if (fechaDesdeFiltro) {
          
            params.fechaDesde = fechaDesdeFiltro; 
        }

        try {
           
            const response = await axios.get(ITEMS_ENDPOINT, { params }); 
        
            setItems(response.data.content); 
            setCurrentPage(response.data.number); 
            setTotalPages(response.data.totalPages); 
            setLoading(false);

        } catch (err) {
            console.error("Error fetching items:", err);
           
            const errorMessage = err.response && err.response.data 
                ? `Error: ${err.response.status} - ${err.response.data.message || 'Error del servidor'}`
                : "Error al cargar las prendas. Revisa el backend.";
                
            setError(errorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [currentPage, categoriaFiltro, fechaDesdeFiltro]); 

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCategoryFilter = (category) => {
       
        const newCategory = category === 'Todas' ? '' : category;
        setCategoriaFiltro(newCategory);
        setCurrentPage(0); 
    }


    if (loading) return <p style={{ textAlign: 'center', margin: '50px' }}>Cargando prendas...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red', margin: '50px' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Explorar Prendas ({items.length} encontradas)</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>Filtrar por Categoría:</h4>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                    {['Todas', 'Vestidos', 'Camisas', 'Pantalones', 'Chaquetas', 'Accesorios'].map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => handleCategoryFilter(cat)}
                            style={{ 
                                padding: '8px 15px', 
                                borderRadius: '20px', 
                                border: categoriaFiltro === (cat === 'Todas' ? '' : cat) ? '2px solid #38a169' : '1px solid #ccc',
                                backgroundColor: categoriaFiltro === (cat === 'Todas' ? '' : cat) ? '#e0ffe0' : 'white',
                                cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 'bold' 
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                
                <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Filtrar por Fecha (Desde):</h4>
                <input 
                    type="date" 
                    value={fechaDesdeFiltro}
                    onChange={(e) => {
                        setFechaDesdeFiltro(e.target.value);
                        setCurrentPage(0); 
                    }}
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {items.length > 0 ? (
                    items.map(item => (
                        <SimpleItemCard key={item.id} item={item} />
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No se encontraron prendas con los filtros aplicados.</p>
                )}
            </div>
  
            {totalPages > 1 && (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 0 || loading}
                        style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Anterior
                    </button>
                    <span style={{ margin: '0 10px' }}>
                        Página {currentPage + 1} de {totalPages}
                    </span>
                    <button 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages - 1 || loading}
                        style={{ padding: '10px 20px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExplorePage;