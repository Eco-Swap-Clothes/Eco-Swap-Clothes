// src/services/UserService.js (NUEVO)

import axios from 'axios';
import AuthService from './AuthService'; 

const API_URL = 'http://localhost:8080/api/users/';

class UserService {
    
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
        
        // Asumiendo que el backend tiene el endpoint /api/users/me
        const response = await axios.get(
            API_URL + 'me', 
            { headers } 
        );
        return response.data;
    }
    
    /**
     * Obtiene los artículos del usuario autenticado.
     * Asumimos que el backend puede filtrar items por dueño autenticado
     * O que tiene un endpoint específico (ej. /api/users/me/items)
     */
    async getMyPublishedItems() {
         const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
             throw new Error("No autenticado.");
        }
        // [Ajuste más probable en backend]: Tu backend puede devolver items
        // filtrados para el usuario actual si la ruta es /api/items/my
        // o si es /api/users/me/items
        
        // Opción 1 (más limpia): si el backend tiene un endpoint dedicado
        // const response = await axios.get(API_URL + 'me/items', { headers });
        
        // Opción 2 (más compatible con tu ItemController): pedimos items y
        // el backend deduce el usuario
        const response = await axios.get(
            'http://localhost:8080/api/items/', // Ajusta esta URL si tu backend tiene otra para "mis items"
            { 
                headers,
                // Si tu backend usa el filtro de usuario en ItemController, 
                // podríamos intentar pasar el ID, pero es menos seguro:
                // params: { userId: 'me' } // Solo si el backend lo acepta
            }
        );
        
        // Si el backend devuelve un Page:
        return response.data.content || response.data; 
    }
}

export default new UserService();