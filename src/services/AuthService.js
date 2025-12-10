// src/services/AuthService.js
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
     * @returns {Promise<string>} JWT Token
     */
    async register(nombre, mail, contrasena) {
        // Nota: Asumimos que el backend devuelve el JWT en el cuerpo de la respuesta después del registro.
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
        
        // Guardamos el token y la información del usuario en localStorage al registrarse (login automático)
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data; // Debería contener el token
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

        // Guardamos el token y la información del usuario en localStorage
        if (response.data) {
            // response.data debe contener al menos el token.
            localStorage.setItem('token', response.data); 
        }
        return response.data; // Devuelve el token directamente
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