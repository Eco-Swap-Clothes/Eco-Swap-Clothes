import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext.jsx';
import { API_BASE_URL } from '../../config/api';
import UserService from '../../services/UserService';
import ItemService from '../../services/ItemService';
import './ProfilePage.css';

const BASE_UPLOADS_URL = `${API_BASE_URL}/uploads/`;

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [publishedItems, setPublishedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [editForm, setEditForm] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        talla: '',
        estadoPrenda: '',
        ubicacion: ''
    });

    const { token } = useContext(AuthContext);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchData();
    }, [token]);

    const fetchData = async () => {
        if (!token) {
            setError("No autenticado. Por favor, inicia sesión.");
            setLoading(false);
            return;
        }

        try {
            const userData = await UserService.getCurrentUser();
            setUser(userData);

            const itemsData = await UserService.getMyPublishedItems();
            setPublishedItems(itemsData);

            setLoading(false);
        } catch (err) {
            console.error("Error al cargar el perfil:", err.message);

            if (err.message && err.message.includes("No autenticado")) {
                setError("Sesión expirada o inválida. Intenta iniciar sesión de nuevo.");
            } else {
                setError("Error al cargar el perfil o las prendas. Revisa el backend.");
            }
            setLoading(false);
        }
    };

    const handleDeleteItem = async (itemId) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta prenda?')) {
            return;
        }

        try {
            await ItemService.deleteItem(itemId);
            setPublishedItems(publishedItems.filter(item => item.id !== itemId));
            alert('Prenda eliminada exitosamente');
        } catch (err) {
            console.error("Error al eliminar prenda:", err);
            alert('Error al eliminar la prenda: ' + err.message);
        }
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setEditForm({
            titulo: item.titulo || '',
            descripcion: item.descripcion || '',
            categoria: item.categoria || '',
            talla: item.talla || '',
            estadoPrenda: item.estadoPrenda || '',
            ubicacion: item.ubicacion || ''
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('titulo', editForm.titulo);
            formData.append('descripcion', editForm.descripcion);
            formData.append('categoria', editForm.categoria);
            if (editForm.talla) formData.append('talla', editForm.talla);
            if (editForm.estadoPrenda) formData.append('estadoPrenda', editForm.estadoPrenda);
            if (editForm.ubicacion) formData.append('ubicacion', editForm.ubicacion);

            await ItemService.updateItem(editingItem.id, formData);

            await fetchData();

            setEditingItem(null);
            alert('Prenda actualizada exitosamente');
        } catch (err) {
            console.error("Error al actualizar prenda:", err);
            alert('Error al actualizar la prenda: ' + err.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
        setEditForm({
            titulo: '',
            descripcion: '',
            categoria: '',
            talla: '',
            estadoPrenda: '',
            ubicacion: ''
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <p className="text-red-600 text-center">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 max-w-md">
                    <p className="text-orange-600 text-center">No se pudo cargar la información del usuario.</p>
                </div>
            </div>
        );
    }

    const totalPuntos = user.puntos || 0;
    const itemsPublicadosCount = publishedItems.length || 0;
    const valoracion = user.valoracion || 0;

    const profileImageUrl = user.imagenPerfil
        ? `${BASE_UPLOADS_URL}${user.imagenPerfil}`
        : '/default-avatar.png';

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={profileImageUrl}
                            alt={user.nombre}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-2">{user.nombre}</h1>
                            <p className="text-green-100 mb-1">{user.mail}</p>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-semibold">{valoracion.toFixed(1)} Valoración</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-500 rounded-xl px-8 py-4 text-center shadow-md">
                        <p className="text-sm font-semibold uppercase tracking-wide mb-1">Tus Puntos</p>
                        <p className="text-5xl font-bold">{totalPuntos}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-4 rounded-full">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Prendas Publicadas</p>
                            <p className="text-3xl font-bold text-gray-800">{itemsPublicadosCount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-4 rounded-full">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Intercambios Realizados</p>
                            <p className="text-3xl font-bold text-gray-800">{user.intercambios || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                    Mis Prendas Publicadas
                </h2>

                {publishedItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {publishedItems.map(item => (
                            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                          
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={item.imagenPrincipal ? `${BASE_UPLOADS_URL}${item.imagenPrincipal}` : '/placeholder-clothing.jpg'}
                                        alt={item.titulo}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                                        {item.titulo}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {item.descripcion || 'Sin descripción'}
                                    </p>

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaEdit />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaTrash />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-500 text-lg">Aún no has publicado ninguna prenda</p>
                        <p className="text-gray-400 mt-2">¡Comienza a compartir tu ropa hoy!</p>
                    </div>
                )}
            </div>

            {editingItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Prenda</h2>

                            <form onSubmit={handleEditSubmit} className="space-y-4">
                           
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Título *
                                    </label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        value={editForm.titulo}
                                        onChange={handleEditFormChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descripción *
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        value={editForm.descripcion}
                                        onChange={handleEditFormChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoría *
                                    </label>
                                    <select
                                        name="categoria"
                                        value={editForm.categoria}
                                        onChange={handleEditFormChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        <option value="Camisas">Camisas</option>
                                        <option value="Pantalones">Pantalones</option>
                                        <option value="Vestidos">Vestidos</option>
                                        <option value="Chaquetas">Chaquetas</option>
                                        <option value="Zapatos">Zapatos</option>
                                        <option value="Accesorios">Accesorios</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Talla
                                    </label>
                                    <select
                                        name="talla"
                                        value={editForm.talla}
                                        onChange={handleEditFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una talla</option>
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Estado de la Prenda
                                    </label>
                                    <select
                                        name="estadoPrenda"
                                        value={editForm.estadoPrenda}
                                        onChange={handleEditFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Selecciona el estado</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Como nuevo">Como nuevo</option>
                                        <option value="Buen estado">Buen estado</option>
                                        <option value="Usado">Usado</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ubicación
                                    </label>
                                    <input
                                        type="text"
                                        name="ubicacion"
                                        value={editForm.ubicacion}
                                        onChange={handleEditFormChange}
                                        placeholder="Ciudad, País"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
