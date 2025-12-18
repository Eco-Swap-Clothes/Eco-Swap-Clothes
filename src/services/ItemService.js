
import apiClient from '../config/api';

class ItemService {

    async getAllItems() {
        const response = await apiClient.get('/api/items');

        return response.data.content || response.data;
    }

    /**
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