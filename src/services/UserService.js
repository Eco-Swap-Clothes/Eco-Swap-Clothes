// src/services/UserService.js (CÓDIGO COMPLETO CORREGIDO)

import axios from 'axios';
import AuthService from './AuthService'; 

// Definimos la URL base para usuarios, que termina en /
const API_URL_USERS = 'http://localhost:8080/api/users/';

class UserService {
    
    getAuthHeaders() {
        const token = AuthService.getCurrentToken();
        if (token) {
            // Asegúrate de que el formato sea { Authorization: 'Bearer TOKEN' }
            return { Authorization: `Bearer ${token}` };
        }
        return {}; 
    }

    /**
     * Obtiene los datos del usuario autenticado (GET /api/users/me).
     */
    async getCurrentUser() {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
            // Se lanza error si no hay token
            throw new Error("No autenticado.");
        }
        
        const response = await axios.get(
            // Usa la constante API_URL_USERS y añade 'me'
            API_URL_USERS + 'me', 
            { headers } 
        );
        return response.data;
    }
    
    /**
     * Obtiene los artículos del usuario autenticado.
     */
    async getMyPublishedItems() {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
            throw new Error("No autenticado.");
        }
        
        // CORRECCIÓN CLAVE: Eliminamos la barra diagonal al final del endpoint de ítems
        // para que coincida exactamente con el mapeo del ItemController (/api/items).
        const ITEM_API_URL = 'http://localhost:8080/api/items'; 
        
        const response = await axios.get(
            ITEM_API_URL, // <--- ¡SIN BARRA FINAL! Mapea a GET /api/items
            { headers }
        );
        
        // Si el backend devuelve un Page<ItemDTO>, extraemos el 'content'
        return response.data.content || response.data; 
    }
}

export default new UserService();