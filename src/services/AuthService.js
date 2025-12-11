// src/services/AuthService.js (CÓDIGO FINAL Y CORREGIDO)

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    
    getCurrentToken() {
        return localStorage.getItem('token');
    }
    
    // 1. REGISTRO (POST /api/auth/register)
    async register(nombre, mail, password) {
        const response = await axios.post(API_URL + 'register', {
            nombre,
            mail,
            contrasena: password // Corregido: mapea 'password' a 'contrasena'
        });
        return response.data;
    }

    // 2. LOGIN (POST /api/auth/login)
    async login(mail, password) {
        // Corregido: mapea 'password' a 'contrasena'
        const response = await axios.post(API_URL + 'login', {
            mail,
            contrasena: password 
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    }
    
    // 3. LOGOUT
    logout() {
        localStorage.removeItem('token');
    }

}

export default new AuthService();