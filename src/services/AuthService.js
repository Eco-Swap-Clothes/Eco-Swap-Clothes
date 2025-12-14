

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    
    getCurrentToken() {
        return localStorage.getItem('token');
    }
 
    async register(nombre, mail, password) {
        const response = await axios.post(API_URL + 'register', {
            nombre,
            mail,
            contrasena: password 
        });
        return response.data;
    }

    async login(mail, password) {
    
        const response = await axios.post(API_URL + 'login', {
            mail,
            contrasena: password 
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('token');
    }

}

export default new AuthService();