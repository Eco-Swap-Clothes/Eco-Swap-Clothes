import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaLeaf, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-eco-primary text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                 
                    <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div>
                            <h1 className="text-2xl font-bold">EcoSwap</h1>
                            <p className="text-xs text-gray-200"></p>
                        </div>
                    </Link>

             
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="hover:opacity-80 transition-opacity font-medium">
                            Inicio
                        </Link>
                        <Link to="/explore" className="hover:opacity-80 transition-opacity font-medium">
                            Explorar
                        </Link>
                        {isAuthenticated && (
                            <Link to="/publish" className="hover:opacity-80 transition-opacity font-medium">
                                Publicar
                            </Link>
                        )}
                    </nav>

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors font-medium"
                                >
                                    <FaUser />
                                    <span className="hidden sm:inline">Perfil</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-green-800 px-4 py-2 rounded-lg hover:bg-green-900 transition-colors font-medium"
                                >
                                    <FaSignOutAlt />
                                    <span className="hidden sm:inline">Salir</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors font-medium"
                                >
                                    <FaSignInAlt />
                                    <span className="hidden sm:inline">Iniciar Sesión</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 bg-green-800 px-4 py-2 rounded-lg hover:bg-green-900 transition-colors font-medium"
                                >
                                    <FaUserPlus />
                                    <span className="hidden sm:inline">Registrarse</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden flex justify-center gap-4 mt-4 pt-4 border-t border-gray-400">
                    <Link to="/" className="hover:opacity-80 transition-opacity text-sm font-medium">
                        Inicio
                    </Link>
                    <Link to="/explore" className="hover:opacity-80 transition-opacity text-sm font-medium">
                        Explorar
                    </Link>
                    {isAuthenticated && (
                        <Link to="/publish" className="hover:opacity-80 transition-opacity text-sm font-medium">
                            Publicar
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
