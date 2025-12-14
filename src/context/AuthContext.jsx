
import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService'; 

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState(AuthService.getCurrentToken()); 
    const [isAuthenticated, setIsAuthenticated] = useState(!!AuthService.getCurrentToken());
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const login = async (mail, password) => {
        setLoading(true);
        try {
            const response = await AuthService.login(mail, password);
            if (response.token) {
                setToken(response.token);
            
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            throw error; 
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        AuthService.logout(); 
        setToken(null);
    };

    const contextValue = {
        token,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

