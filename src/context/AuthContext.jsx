// src/context/AuthContext.jsx (CÓDIGO CORREGIDO Y COMPLETO)

import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService'; 
// Asegúrate de que AuthService.js exporta 'export default new AuthService();'

// 1. Crear el Contexto
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// 2. Crear el Provider (El que envuelve a toda la aplicación)
export const AuthProvider = ({ children }) => {
    // El token se inicializa leyendo del localStorage usando el servicio
    const [token, setToken] = useState(AuthService.getCurrentToken()); 
    const [isAuthenticated, setIsAuthenticated] = useState(!!AuthService.getCurrentToken());
    const [loading, setLoading] = useState(false); // Para manejar el estado de las llamadas

    // Efecto para actualizar el estado de autenticación cada vez que el token cambie
    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    // Función de Login que actualiza el token en el estado y localStorage
    const login = async (mail, password) => {
        setLoading(true);
        try {
            const response = await AuthService.login(mail, password);
            if (response.token) {
                setToken(response.token);
                // AuthService ya maneja localStorage.setItem
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Propagar el error para que el componente Login lo maneje
        } finally {
            setLoading(false);
        }
    };

    // Función de Logout
    const logout = () => {
        AuthService.logout(); // Limpia localStorage
        setToken(null);
    };

    // 3. Objeto de Valor del Contexto
    const contextValue = {
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        // Puedes añadir aquí datos del usuario si AuthService tuviera un getCurrentUser()
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


// 4. Hook personalizado para usar el contexto (ESTO RESUELVE EL ReferenceError)
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Nota: En tu ProfilePage.jsx, estás usando: const { token } = useContext(AuthContext); 
// Esto es correcto, pero si en otra parte intentaste usar 'useAuth()' sin definirlo, fallaría.