import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaGithub, FaHeart, FaRecycle } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <FaLeaf className="text-green-500 text-2xl" />
                            <h3 className="text-xl font-bold text-white">EcoSwap</h3>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Plataforma de intercambio de ropa sostenible.
                            Reduce, reutiliza y recicla tu guardarropa mientras
                            ayudas al planeta.
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-green-400">
                            <FaRecycle className="text-lg" />
                            <span className="text-sm font-semibold">Moda Circular</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm hover:text-green-400 transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/explore" className="text-sm hover:text-green-400 transition-colors">
                                    Explorar Prendas
                                </Link>
                            </li>
                            <li>
                                <Link to="/publish" className="text-sm hover:text-green-400 transition-colors">
                                    Publicar Prenda
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="text-sm hover:text-green-400 transition-colors">
                                    Mi Perfil
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info Section */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Sobre Nosotros</h4>
                        <p className="text-sm mb-4">
                            EcoSwap es un proyecto dedicado a promover la
                            moda sostenible y el consumo responsable.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/Eco-Swap-Clothes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaGithub className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center">
                    <p className="text-sm flex items-center justify-center gap-2">
                        Hecho con <FaHeart className="text-red-500" /> por el equipo EcoSwap
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        © {new Date().getFullYear()} EcoSwap. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
