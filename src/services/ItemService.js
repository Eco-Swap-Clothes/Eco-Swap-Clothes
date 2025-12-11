// src/services/ItemService.js

import axios from 'axios';
import AuthService from './AuthService'; 

// URL base para el ItemController
const API_URL = 'http://localhost:8080/api/items'; 

class ItemService {
    
    // Función de utilidad para obtener los headers de autorización
    getAuthHeaders() {
        const token = AuthService.getCurrentToken();
        if (token) {
            // Devuelve los headers con el token Bearer
            return { Authorization: `Bearer ${token}` };
        }
        return {}; 
    }

    /**
     * Publica un nuevo artículo (POST /api/items).
     * @param {FormData} formData - Contiene los datos del artículo (título, descripción, imagenPrincipal, etc.).
     */
    async createItem(formData) {
        const headers = this.getAuthHeaders();
        
        if (!headers.Authorization) {
            throw new Error("No autenticado. Por favor, inicia sesión.");
        }
        
        const response = await axios.post(
            API_URL, 
            formData, 
            { 
                headers: {
                    ...headers,
                } 
            } 
        );
        return response.data;
    }
    
    // Aquí puedes añadir otras funciones como:
    
    // async getItems(params) { ... }
    // async getItemById(itemId) { ... }
    
}

// Exportamos una instancia de la clase para usarla directamente.
export default new ItemService();