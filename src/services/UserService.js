// src/services/UserService.js (CÓDIGO FINAL CORREGIDO)

import axios from 'axios';
import AuthService from './AuthService'; 

// Definimos la URL base para usuarios, que termina en /
const API_URL_USERS = 'http://localhost:8080/api/users/';

class UserService {
    
    // ... (getAuthHeaders es correcto) ...
    getAuthHeaders() {
        const token = AuthService.getCurrentToken();
        if (token) {
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
            throw new Error("No autenticado.");
        }
        
        const response = await axios.get(
            API_URL_USERS + 'me', 
            { headers } 
        );
        return response.data;
    }
    
    /**
     * Obtiene los artículos del usuario autenticado.
     * ¡Llamada a la ruta de perfil corregida: /api/users/me/items!
     */
    async getMyPublishedItems() {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
            throw new Error("No autenticado.");
        }
        
        // ¡CORRECCIÓN CLAVE! Llama al endpoint del usuario
        const response = await axios.get(
            API_URL_USERS + 'me/items', // <--- ¡Esta es la ruta correcta!
            { headers }
        );
        
        // Asumimos que el backend ya devuelve una lista
        return response.data; 
    }
}

export default new UserService();