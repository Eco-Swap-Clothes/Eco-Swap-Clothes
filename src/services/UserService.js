
import apiClient from '../config/api';

class UserService {

    async getCurrentUser() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No autenticado.");
        }

        const response = await apiClient.get('/api/users/me');
        return response.data;
    }

    async getMyPublishedItems() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No autenticado.");
        }

        const response = await apiClient.get('/api/users/me/items');
        return response.data;
    }
}

export default new UserService();