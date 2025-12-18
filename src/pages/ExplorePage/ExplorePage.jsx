import React, { useState, useEffect } from 'react';
import ItemService from '../../services/ItemService';
import ItemCard from '../../components/ItemCard/ItemCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './ExplorePage.css';

const ExplorePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [selectedSize, setSelectedSize] = useState('Todas');
    const [filterDate, setFilterDate] = useState('');

    const categories = ['Todas', 'Camisas', 'Pantalones', 'Vestidos', 'Chaquetas', 'Zapatos', 'Accesorios'];
    const sizes = ['Todas', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await ItemService.getAllItems();
            setItems(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError(err.message || 'No se pudieron cargar las prendas. Verifica que el backend esté funcionando.');
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || item.categoria === selectedCategory;
        const matchesSize = selectedSize === 'Todas' || item.talla === selectedSize;

        // Filter by date if selected
        let matchesDate = true;
        if (filterDate) {
            const itemDate = new Date(item.fechaCreacion);
            const selectedDate = new Date(filterDate);
            matchesDate = itemDate.toDateString() === selectedDate.toDateString();
        }

        return matchesSearch && matchesCategory && matchesSize && matchesDate;
    }).sort((a, b) => {
        // Sort by most recent first
        const dateA = new Date(a.fechaCreacion);
        const dateB = new Date(b.fechaCreacion);
        return dateB - dateA;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando prendas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <p className="text-red-600 text-center">{error}</p>
                    <button
                        onClick={fetchItems}
                        className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">Explorar Prendas</h1>
                <p className="text-gray-600 text-lg">
                    Descubre prendas únicas y sostenibles de nuestra comunidad
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por título o descripción..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-4">
                    <FaFilter className="text-gray-600" />
                    <span className="font-semibold text-gray-700">Filtros:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categoría
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Size Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Talla
                        </label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            {sizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filter by Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filtrar por Fecha
                        </label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Mostrando <span className="font-bold text-green-600">{filteredItems.length}</span> de {items.length} prendas
                </p>
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <svg
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-gray-500 text-lg mb-2">No se encontraron prendas</p>
                    <p className="text-gray-400">Intenta ajustar los filtros de búsqueda</p>
                </div>
            )}
        </div>
    );
};

export default ExplorePage;
