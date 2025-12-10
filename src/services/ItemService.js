// src/services/ItemService.js (CÓDIGO COMPLETO FINAL)

import axios from 'axios';
import AuthService from './AuthService'; 

const API_URL = 'http://localhost:8080/api/items/';

class ItemService {
    
    // Función de ayuda para obtener el token y armar los headers
    getAuthHeaders() {
        const token = AuthService.getCurrentToken();
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        // Lanzar un error o manejar la falta de token si se llama a una ruta protegida sin él.
        return {}; 
    }

    /**
     * Crea un nuevo artículo (Ruta protegida - Requiere token).
     * @param {FormData} formData - Contiene los datos del artículo y el archivo de imagen.
     */
    async createItem(formData) {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
             throw new Error("No autenticado. Inicia sesión para publicar.");
        }
        
        const response = await axios.post(
            API_URL, 
            formData, 
            { headers: headers } 
        );
        return response.data;
    }

    /**
     * Obtiene artículos con paginación y filtros (Ruta pública).
     * Los filtros (page, size, categoria, fechaDesde) se pasan como parámetros.
     */
    async getItems(page = 0, size = 12, categoria = '', fechaDesde = '') {
        const params = { page, size };
        if (categoria) params.categoria = categoria;
        if (fechaDesde) params.fechaDesde = fechaDesde; 
        
        const response = await axios.get(API_URL, { params });
        // Devuelve el objeto Page de Spring (content, totalPages, number, etc.)
        return response.data; 
    }
    
    /**
     * Obtiene un artículo por ID.
     */
    async getItemById(itemId) {
        const response = await axios.get(API_URL + itemId);
        return response.data;
    }
    
    // --- ACCIONES PROTEGIDAS ---

    /**
     * Reserva un artículo (Ruta protegida - Requiere token).
     */
    async reservarItem(itemId) {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
             throw new Error("No autenticado.");
        }
        // Llama a POST /api/items/{itemId}/reserve
        const response = await axios.post(
            `${API_URL}${itemId}/reserve`, 
            null, // El cuerpo de la petición va vacío
            { headers }
        );
        return response.data;
    }

    /**
     * Cancela la reserva de un artículo (Ruta protegida - Requiere token).
     */
    async cancelarReserva(itemId) {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
             throw new Error("No autenticado.");
        }
        // Llama a DELETE /api/items/{itemId}/reserve
        const response = await axios.delete(
            `${API_URL}${itemId}/reserve`, 
            { headers }
        );
        return response.data;
    }
    
    /**
     * Completa el intercambio del artículo (Ruta protegida - Solo el dueño).
     */
    async completarIntercambio(itemId) {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
             throw new Error("No autenticado.");
        }
        // Llama a POST /api/items/{itemId}/complete
        const response = await axios.post(
            `${API_URL}${itemId}/complete`, 
            null, 
            { headers }
        );
        return response.data;
    }

    // Nota: Faltarían los métodos para editar y eliminar, que también usarían el token.
}

export default new ItemService();