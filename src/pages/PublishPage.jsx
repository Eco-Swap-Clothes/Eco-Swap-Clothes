// src/pages/PublishPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemService from '../services/ItemService';

const PublishPage = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [puntosAGanar, setPuntosAGanar] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState(null);
    const [estado, setEstado] = useState('Excelente');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (!titulo || !puntosAGanar || !categoria || !imagen) {
            setMessage('Por favor, completa todos los campos obligatorios y sube una imagen.');
            setLoading(false);
            return;
        }
        
        // Usamos FormData para enviar texto y archivo en una sola petición
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('puntosAGanar', puntosAGanar);
        formData.append('categoria', categoria);
        formData.append('estado', estado); // Aunque el backend lo fija, lo enviamos
        formData.append('imagen', imagen); // El nombre de la clave debe coincidir con @RequestPart(value = "imagen")

        try {
            // Llama a POST /api/items (Requiere token)
            await ItemService.createItem(formData);
            
            setMessage('¡Prenda publicada con éxito! Ya está disponible en la comunidad.');
            setLoading(false);

            // Redirigir al usuario a la página de exploración o a su perfil
            setTimeout(() => {
                navigate('/profile'); 
            }, 2000);
            
        } catch (error) {
            setLoading(false);
            console.error('Error al publicar prenda:', error.response || error);
            
            if (error.response && error.response.status === 403) {
                 setMessage('Error 403 Forbidden: No estás autenticado o no tienes permisos para publicar.');
            } else {
                 setMessage('Error al subir la prenda. Revisa el servidor y los datos.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Publicar Prenda</h2>
            <form onSubmit={handleSubmit}>
                {/* Fotos de la prenda */}
                <div style={{ marginBottom: '20px' }}>
                    <label>Fotos de la prenda (Principal):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        style={{ display: 'block', marginTop: '5px' }}
                    />
                    {imagen && <p style={{ fontSize: '0.9em', color: '#38a169' }}>Archivo seleccionado: {imagen.name}</p>}
                </div>
                
                {/* Nombre de la prenda */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Nombre de la prenda:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                
                {/* Descripción (Añadido para el backend) */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows="3"
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                
                {/* Puntos a Ganar */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Puntos a Ganar:</label>
                    <input
                        type="number"
                        value={puntosAGanar}
                        onChange={(e) => setPuntosAGanar(e.target.value)}
                        required
                        min="1"
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                
                {/* Categoría */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Categoría:</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    >
                        <option value="">Selecciona una Categoría</option>
                        <option value="Vestidos">Vestidos</option>
                        <option value="Camisas">Camisas</option>
                        <option value="Pantalones">Pantalones</option>
                        <option value="Chaquetas">Chaquetas</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                </div>

                {/* Estado (Según diseño image_ec26f4.png) */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Estado:</label>
                    {['Excelente', 'Muy bueno', 'Bueno'].map(est => (
                        <button
                            key={est}
                            type="button"
                            onClick={() => setEstado(est)}
                            style={{ 
                                padding: '8px 15px', 
                                margin: '0 10px 0 0', 
                                borderRadius: '20px', 
                                border: estado === est ? '2px solid #38a169' : '1px solid #ccc',
                                backgroundColor: estado === est ? '#e0ffe0' : 'white',
                                cursor: 'pointer'
                            }}
                        >
                            {est}
                        </button>
                    ))}
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#38a169', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: loading ? 'not-allowed' : 'pointer', 
                        marginTop: '20px' 
                    }}
                >
                    {loading ? 'Publicando...' : 'Publicar Prenda'}
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default PublishPage;