import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaRecycle, FaUsers, FaHandshake, FaArrowRight, FaStar } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="min-h-screen">
  
            <section className="bg-eco-secondary py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <img src="/Logo.png" alt="EcoSwap Logo" className="h-32 w-auto" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
                            Bienvenido a EcoSwap
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
                            EcoSwap es una plataforma de intercambio de ropa sostenible donde puedes dar una segunda vida a tu ropa y ayudar al planeta.
                            Únete a nuestra comunidad, publica tus prendas, explora lo que otros ofrecen y realiza intercambios de forma segura.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/explore"
                                className="bg-eco-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                Explorar Prendas
                                <FaArrowRight />
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gray-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                Únete Ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
