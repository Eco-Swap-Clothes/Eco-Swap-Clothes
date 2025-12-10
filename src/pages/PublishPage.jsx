// src/pages/PublishPage.jsx (CORREGIDO)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemService from '../services/ItemService';

const PublishPage = () => {
    // ... (Estado igual)
    // eslint-disable-next-line no-unused-vars
    const [titulo, setTitulo] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [descripcion, setDescripcion] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [puntosAGanar, setPuntosAGanar] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [estado, setEstado] = useState('Excelente'); // Aunque no se envía, se mantiene para la UI
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
        
        // [CORRECCIÓN 1.2] El nombre de la clave debe ser 'imagenPrincipal' para el backend
        formData.append('imagenPrincipal', imagen); 

        // [CORRECCIÓN 1.1] Eliminamos formData.append('estado', estado);
        // El backend lo fija automáticamente a DISPONIBLE.

        try {
            // Llama a POST /api/items (Requiere token)
            await ItemService.createItem(formData);
            
            setMessage('¡Prenda publicada con éxito! Ya está disponible en la comunidad.');
            setLoading(false);

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/profile'); 
            }, 2000);
            
        } catch (error) {
            setLoading(false);
            console.error('Error al publicar prenda:', error.response || error);
            
            const apiMessage = error.response && error.response.data && error.response.data.message;
            
            if (error.response && error.response.status === 403) {
                 setMessage('Error 403 Forbidden: Debes iniciar sesión para publicar.');
            } else if (apiMessage) {
                 setMessage(`Error al subir la prenda: ${apiMessage}`);
            } else {
                 setMessage('Error de conexión al intentar publicar la prenda.');
            }
        }
    };

    // ... (El JSX es el mismo)
    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Publicar Prenda</h2>
            <form onSubmit={handleSubmit}>
                {/* ... (Toda la UI de los campos de input y el botón) ... */}
                
                {/* Input de Imagen Principal */}
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
                
                {/* ... (Resto de los inputs) ... */}

                <button 
                    type="submit" 
                    disabled={loading}
                    // ... (Estilos) ...
                >
                    {loading ? 'Publicando...' : 'Publicar Prenda'}
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default PublishPage;