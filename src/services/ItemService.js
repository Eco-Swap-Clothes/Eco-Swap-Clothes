
import apiClient from '../config/api';

class ItemService {

    /**
     * Obtener todos los items publicados
     */
    async getAllItems() {
        const response = await apiClient.get('/api/items');
        // Backend returns paginated data, extract the content array
        return response.data.content || response.data;
    }

    /**
     * Crear un nuevo item
     * @param {FormData} formData
     */
    async createItem(formData) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No autenticado. Por favor, inicia sesión.");
        }

        const response = await apiClient.post('/api/items', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

    /**
     * Actualizar un item existente
     * @param {number} itemId
     * @param {FormData} formData
     */
    async updateItem(itemId, formData) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No autenticado. Por favor, inicia sesión.");
        }

        const response = await apiClient.put(`/api/items/${itemId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

    /**
     * Eliminar un item
     * @param {number} itemId
     */
    async deleteItem(itemId) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No autenticado. Por favor, inicia sesión.");
        }

        const response = await apiClient.delete(`/api/items/${itemId}`);
        return response.data;
    }

}

export default new ItemService();