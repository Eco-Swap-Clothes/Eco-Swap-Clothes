

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

     
        const puntosNum = parseInt(puntosAGanar, 10);
        if (isNaN(puntosNum) || puntosNum <= 0) {
            setMessage('Los puntos deben ser un número entero positivo.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);

        formData.append('puntosAGanar', puntosNum.toString()); 
        formData.append('categoria', categoria);
        
        formData.append('imagenPrincipal', imagen); 
 

        try {
     
            await ItemService.createItem(formData);
            
            setMessage('¡Prenda publicada con éxito! Ya está disponible en la comunidad.');
            setLoading(false);

            setTimeout(() => {
                navigate('/profile'); 
            }, 2000);
            
        } catch (error) {
            setLoading(false);
            console.error('Error al publicar prenda:', error.response || error);
            
            const status = error.response ? error.response.status : null;
            let apiMessage = error.response && error.response.data && error.response.data.message;

            if (!apiMessage && status === 400 && error.response.data.errors) {
                apiMessage = error.response.data.errors.map(err => err.defaultMessage).join(', ');
            }
            
            if (status === 403) {
                setMessage('Error 403 Forbidden: Debes iniciar sesión para publicar.');
            } else if (status === 400) {
                setMessage(`Error de validación (400): ${apiMessage || 'Verifica los datos enviados.'}`);
            } else if (status === 500) {
                
                setMessage('Error 500: Fallo interno del servidor. Revisa la consola del backend de Java.');
            } else if (apiMessage) {
                setMessage(`Error al subir la prenda: ${apiMessage}`);
            } else {
                setMessage('Error de conexión al intentar publicar la prenda.');
            }
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };


    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Publicar Prenda</h2>
            <form onSubmit={handleSubmit}>
                
          
                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Título de la Prenda (*)</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        style={inputStyle}
                        placeholder="Ej: Camisa vaquera vintage"
                    />
                </div>

               
                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        style={{ ...inputStyle, height: '100px' }}
                        placeholder="Detalles sobre la prenda, talla, color, etc."
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Puntos a Intercambiar (*)</label>
                    <input
                        type="number"
                        value={puntosAGanar}
                        onChange={(e) => setPuntosAGanar(e.target.value)}
                        required
                        min="1"
                        style={inputStyle}
                        placeholder="Ej: 50"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Categoría (*)</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                        style={inputStyle}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        <option value="Vestidos">Vestidos</option>
                        <option value="Camisas">Camisas</option>
                        <option value="Pantalones">Pantalones</option>
                        <option value="Chaquetas">Chaquetas</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Estado de la Prenda</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="Excelente">Excelente</option>
                        <option value="Bueno">Bueno</option>
                        <option value="Aceptable">Aceptable</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Fotos de la prenda (Principal): (*)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        style={{ display: 'block', marginTop: '5px' }}
                    />
                    {imagen && <p style={{ fontSize: '0.9em', color: '#38a169' }}>Archivo seleccionado: {imagen.name}</p>}
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: loading ? '#a0a0a0' : '#38a169', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Publicando...' : 'Publicar Prenda'}
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.includes('Error') || message.includes('Por favor') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default PublishPage;