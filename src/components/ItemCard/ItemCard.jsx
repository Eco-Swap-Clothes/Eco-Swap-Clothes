import React from 'react';
import { FaStar, FaTshirt, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import { API_BASE_URL } from '../../config/api';
import './ItemCard.css';

const BASE_UPLOADS_URL = `${API_BASE_URL}/uploads/`;

const ItemCard = ({ item }) => {
    const imageUrl = item.imagenPrincipal
        ? `${BASE_UPLOADS_URL}${item.imagenPrincipal}`
        : '/placeholder-clothing.jpg';

    const estadoColors = {
        'Nuevo': 'bg-green-100 text-green-800',
        'Como nuevo': 'bg-blue-100 text-blue-800',
        'Buen estado': 'bg-yellow-100 text-yellow-800',
        'Usado': 'bg-orange-100 text-orange-800',
        'default': 'bg-gray-100 text-gray-800'
    };

    const estadoColor = estadoColors[item.estado] || estadoColors.default;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                    src={imageUrl}
                    alt={item.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = '/placeholder-clothing.jpg';
                    }}
                />
                {/* Estado Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`${estadoColor} px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                        {item.estado || 'N/A'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                    {item.titulo}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                    {item.descripcion || 'Sin descripción'}
                </p>

                {/* Details Grid */}
                <div className="space-y-2 mb-4">
                    {/* Category & Size */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-700">
                            <FaTshirt className="text-green-600" />
                            <span className="font-medium">{item.categoria || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-700">
                            <FaTag className="text-green-600" />
                            <span className="font-medium">Talla {item.talla || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Location if available */}
                    {item.ubicacion && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <FaMapMarkerAlt className="text-green-600" />
                            <span>{item.ubicacion}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="text-sm font-semibold text-gray-700">
                            {item.valoracion ? item.valoracion.toFixed(1) : '5.0'}
                        </span>
                    </div>

                    {/* View Details Button */}
                    <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
