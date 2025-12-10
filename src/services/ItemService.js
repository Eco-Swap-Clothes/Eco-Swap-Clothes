// src/services/ItemService.js
import axios from 'axios';
import AuthService from './AuthService'; // Para obtener el token

const API_URL = 'http://localhost:8080/api/items';

/**
 * Servicio para manejar las llamadas a la API de Artículos (Items).
 */
class ItemService {

    /**
     * Sube un nuevo artículo y su imagen a POST /api/items
     * @param {FormData} formData - Datos del formulario con la imagen.
     * @returns {Promise<Object>} El DTO del artículo creado.
     */
    async createItem(formData) {
        const token = AuthService.getCurrentToken();
        if (!token) {
            throw new Error("No autenticado. El token no está disponible.");
        }

        const response = await axios.post(API_URL, formData, {
            headers: {
                // Importante: No establecer Content-Type para FormData. Axios y el navegador lo hacen automáticamente.
                'Authorization': `Bearer ${token}` 
            }
        });

        return response.data;
    }
}

export default new ItemService();