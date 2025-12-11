// src/App.jsx (CÓDIGO CORREGIDO Y LIMPIO)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Eliminamos la importación duplicada de AuthProvider y Router (BrowserRouter)
import { AuthContext } from './context/AuthContext.jsx'; // Solo necesitamos el Contexto

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// === Importaciones de Páginas ===
import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PublishPage from './pages/PublishPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
// =================================


/**
 * Componente de Ruta Privada: Protege rutas que requieren autenticación (token).
 */
const PrivateRoute = ({ children }) => {
    // Usamos el contexto para verificar si hay un token JWT
    const { token } = React.useContext(AuthContext); 
    // Si no hay token, redirige a /login
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        // [CLAVE]: Eliminamos <Router> y <AuthProvider> que estaban aquí.
        // El contexto ya viene de main.jsx
        <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Routes>
                    {/* Rutas Públicas */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Rutas Protegidas (Usan PrivateRoute) */}
                    <Route 
                        path="/publish" 
                        element={<PrivateRoute><PublishPage /></PrivateRoute>} 
                    />
                    <Route 
                        path="/profile" 
                        element={<PrivateRoute><ProfilePage /></PrivateRoute>} 
                    />
                    
                    {/* Si tuvieras una página de detalle de artículo: */}
                    {/* <Route path="/item/:id" element={<ItemDetailPage />} /> */}

                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;