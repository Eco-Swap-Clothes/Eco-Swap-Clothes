// src/services/AuthService.js (CORREGIDO)
import axios from 'axios';

// La URL base de tu backend de Spring Boot
const API_URL = 'http://localhost:8080/api/auth/';

/**
 * Servicio para manejar las llamadas a la API de autenticación.
 */
class AuthService {

    /**
     * Llama al endpoint de registro.
     * @param {string} nombre
     * @param {string} mail
     * @param {string} contrasena
     * @returns {Promise<Object>} El DTO del usuario creado.
     */
    async register(nombre, mail, contrasena) {
        const response = await axios.post(API_URL + 'register', {
            nombre,
            mail,
            contrasena
        }, {
            headers: {
                // Confirmamos el tipo de contenido que enviamos
                'Content-Type': 'application/json' 
            }
        });
        
        // El backend devuelve solo el objeto de usuario (sin token).
        // Se omite la lógica de login automático para coincidir con la implementación del backend.
        
        return response.data; 
    }

    /**
     * Llama al endpoint de inicio de sesión.
     * @param {string} mail
     * @param {string} contrasena
     * @returns {Promise<string>} JWT Token
     */
    async login(mail, contrasena) {
        const response = await axios.post(API_URL + 'login', {
            mail,
            contrasena
        }, {
            headers: {
                'Content-Type': 'application/json' 
            }
        });

        // [CORRECCIÓN CLAVE]: El backend devuelve { token: "..." }. 
        // Extraemos solo la cadena del token para guardar en localStorage.
        const token = response.data.token; 

        // Guardamos el token en localStorage
        if (token) {
            localStorage.setItem('token', token); 
        }
        return token; // Devuelve el token
    }

    /**
     * Elimina el token del localStorage para cerrar la sesión.
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Si guardaste más info
    }

    /**
     * Obtiene el token JWT del localStorage.
     * @returns {string | null}
     */
    getCurrentToken() {
        return localStorage.getItem('token');
    }
}

export default new AuthService();