import React, { useState, useEffect, useContext } from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import { AuthContext } from '../../context/AuthContext.jsx';
import UserService from '../../services/UserService';
import './ProfilePage.css';

const BASE_UPLOADS_URL = 'http://localhost:8080/uploads/';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [publishedItems, setPublishedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = useContext(AuthContext);

    useEffect(() => {
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
        fetchData();
    }, [token]);

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
            {/* Profile Header Card */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* User Info */}
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

                    {/* Points Badge */}
                    <div className="bg-green-500 rounded-xl px-8 py-4 text-center shadow-md">
                        <p className="text-sm font-semibold uppercase tracking-wide mb-1">Tus Puntos</p>
                        <p className="text-5xl font-bold">{totalPuntos}</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
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

            {/* Published Items Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                    Mis Prendas Publicadas
                </h2>

                {publishedItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {publishedItems.map(item => (
                            <ItemCard key={item.id} item={item} />
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
        </div>
    );
};

export default ProfilePage;
