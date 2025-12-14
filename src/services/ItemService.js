
import axios from 'axios';
import AuthService from './AuthService'; 

const API_URL = 'http://localhost:8080/api/items'; 

class ItemService {
 
    getAuthHeaders() {
        const token = AuthService.getCurrentToken();
        if (token) {
           
            return { Authorization: `Bearer ${token}` };
        }
        return {}; 
    }

    /**
     * 
     * @param {FormData} formData 
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
    
   
}

export default new ItemService();