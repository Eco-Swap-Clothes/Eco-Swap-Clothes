// src/main.jsx
import React from 'react'; // Necesario para la sintaxis JSX
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Importar BrowserRouter
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // 2. Importar AuthProvider

createRoot(document.getElementById('root')).render(
<React.StrictMode>
    {/* 1. Usar BrowserRouter aquí para dar contexto de enrutamiento a toda la app */}
 <BrowserRouter>
        {/* 2. Usar AuthProvider aquí para dar contexto de sesión a toda la app */}
        <AuthProvider> 
     <App />
        </AuthProvider>
</BrowserRouter>
 </React.StrictMode>,
);