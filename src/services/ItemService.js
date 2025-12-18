
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

}

export default new ItemService();