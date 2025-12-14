
import axios from 'axios';
import AuthService from './AuthService'; 

const API_URL_USERS = 'http://localhost:8080/api/users/';

class UserService {
 
    getAuthHeaders() {
        const token = AuthService.getCurrentToken();
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        return {}; 
    }

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
    
    async getMyPublishedItems() {
        const headers = this.getAuthHeaders();
        if (!headers.Authorization) {
            throw new Error("No autenticado.");
        }

        const response = await axios.get(
            API_URL_USERS + 'me/items', 
            { headers }
        );
 
        return response.data; 
    }
}

export default new UserService();