import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemService from '../../services/ItemService';
import { AuthContext } from '../../context/AuthContext';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';

const PublishPage = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        talla: '',
        estado: '',
        ubicacion: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const categories = ['Camiseta', 'Pantalón', 'Vestido', 'Chaqueta', 'Zapatos', 'Accesorios'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const estados = ['Nuevo', 'Como nuevo', 'Buen estado', 'Usado'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                setError('La imagen no debe superar los 5MB');
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.titulo || !formData.descripcion || !formData.categoria ||
            !formData.talla || !formData.estado) {
            setError('Por favor, completa todos los campos obligatorios');
            return;
        }

        if (!image) {
            setError('Por favor, sube una imagen de la prenda');
            return;
        }

        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('titulo', formData.titulo);
            formDataToSend.append('descripcion', formData.descripcion);
            formDataToSend.append('categoria', formData.categoria);
            formDataToSend.append('talla', formData.talla);
            formDataToSend.append('estado', formData.estado);
            formDataToSend.append('ubicacion', formData.ubicacion);
            formDataToSend.append('imagenPrincipal', image);

            await ItemService.createItem(formDataToSend);

            setSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (err) {
            console.error('Publish error:', err);
            if (err.message.includes('autenticado')) {
                setError('Debes iniciar sesión para publicar una prenda');
            } else if (err.message.includes('Error del servidor')) {
                setError(err.message);
            } else if (err.message.includes('conectar con el servidor')) {
                setError(err.message);
            } else {
                setError('Error al publicar la prenda: ' + (err.message || 'Error desconocido'));
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-green-100">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Prenda Publicada!</h2>
                    <p className="text-gray-600">Tu prenda se ha publicado exitosamente.</p>
                    <p className="text-sm text-gray-500 mt-2">Redirigiendo a tu perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-green-50 to-green-100">
            <div className="max-w-3xl mx-auto">
       
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Publicar Prenda</h1>
                    <p className="text-gray-600 text-lg">
                        Comparte tu ropa con la comunidad EcoSwap
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                  
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Imagen de la Prenda *
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mx-auto max-h-64 rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImage(null);
                                                setImagePreview(null);
                                            }}
                                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                                        >
                                            Cambiar imagen
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                                        <label htmlFor="image" className="cursor-pointer">
                                            <span className="text-green-600 font-medium hover:text-green-700">
                                                Haz clic para subir
                                            </span>
                                            <span className="text-gray-600"> o arrastra la imagen aquí</span>
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2">PNG, JPG hasta 5MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                                Título *
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Ej: Camiseta Nike Azul"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción *
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Describe la prenda, su estado, características, etc."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoría *
                                </label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="talla" className="block text-sm font-medium text-gray-700 mb-2">
                                    Talla *
                                </label>
                                <select
                                    id="talla"
                                    name="talla"
                                    value={formData.talla}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Selecciona una talla</option>
                                    {sizes.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                                Estado *
                            </label>
                            <select
                                id="estado"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            >
                                <option value="">Selecciona el estado</option>
                                {estados.map(est => (
                                    <option key={est} value={est}>{est}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                                Ubicación (opcional)
                            </label>
                            <input
                                type="text"
                                id="ubicacion"
                                name="ubicacion"
                                value={formData.ubicacion}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Ej: Madrid, España"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Publicando...</span>
                                </>
                            ) : (
                                <>
                                    <FaUpload />
                                    <span>Publicar Prenda</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PublishPage;
