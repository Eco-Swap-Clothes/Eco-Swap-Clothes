// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Inicializa el estado del token leyendo de localStorage
    const [token, setToken] = useState(AuthService.getCurrentToken());
    const [user, setUser] = useState(null); // Para almacenar datos del usuario (opcional)

    // Función de Login
    const login = async (mail, contrasena) => {
        const tokenData = await AuthService.login(mail, contrasena);
        setToken(tokenData);
        // Opcionalmente, llama a una API protegida para obtener los datos del perfil (GET /api/users/me)
        // const userData = await UserService.getProfile(tokenData);
        // setUser(userData);
        return tokenData;
    };

    // Función de Logout
    const logout = () => {
        AuthService.logout();
        setToken(null);
        setUser(null);
    };

    // Hook para usar el token en cualquier componente
    const useAuth = () => {
        return useContext(AuthContext);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, useAuth }}>
            {children}
        </AuthContext.Provider>
    );
};