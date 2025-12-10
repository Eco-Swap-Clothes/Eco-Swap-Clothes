// src/App.jsx (COMPLETO)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

// === Importaciones de Páginas ===
// Asegúrate de crear estos archivos en la carpeta src/pages/
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PublishPage from './pages/PublishPage';
import ProfilePage from './pages/ProfilePage';
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
        <Router>
            {/* Envuelve toda la aplicación con el proveedor de autenticación */}
            <AuthProvider> 
                <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <main style={{ flexGrow: 1, padding: '20px' }}>
                        <Routes>
                            {/* Rutas Públicas */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/explore" element={<ExplorePage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            
                            {/* Rutas Protegidas */}
                            <Route path="/publish" element={
                                <PrivateRoute>
                                    <PublishPage />
                                </PrivateRoute>
                            } />
                            <Route path="/profile" element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;