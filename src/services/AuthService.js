

import apiClient from '../config/api';

class AuthService {

    getCurrentToken() {
        return localStorage.getItem('token');
    }

    async register(nombre, mail, password) {
        const response = await apiClient.post('/api/auth/register', {
            nombre,
            mail,
            contrasena: password
        });
        return response.data;
    }

    async login(mail, password) {
        const response = await apiClient.post('/api/auth/login', {
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