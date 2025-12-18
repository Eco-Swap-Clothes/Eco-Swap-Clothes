import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaRecycle, FaUsers, FaHandshake, FaArrowRight, FaStar } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <FaLeaf className="text-6xl animate-bounce" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Bienvenido a EcoSwap
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                            La plataforma de intercambio de ropa sostenible.
                            Dale una segunda vida a tu ropa y ayuda al planeta.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/explore"
                                className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                            >
                                Explorar Prendas
                                <FaArrowRight />
                            </Link>
                            <Link
                                to="/register"
                                className="bg-green-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-900 transition-colors flex items-center justify-center gap-2"
                            >
                                Únete Ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        ¿Por qué elegir EcoSwap?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FaRecycle className="text-3xl text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                                Sostenible
                            </h3>
                            <p className="text-gray-600 text-center">
                                Reduce el desperdicio textil y promueve la economía circular.
                                Cada intercambio ayuda al medio ambiente.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FaUsers className="text-3xl text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                                Comunidad
                            </h3>
                            <p className="text-gray-600 text-center">
                                Únete a una comunidad de personas comprometidas con la moda sostenible
                                y el consumo responsable.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FaHandshake className="text-3xl text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                                Confiable
                            </h3>
                            <p className="text-gray-600 text-center">
                                Sistema de valoraciones y puntos que garantiza intercambios
                                seguros entre usuarios verificados.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        ¿Cómo funciona?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                                1
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800">Regístrate</h3>
                            <p className="text-gray-600">
                                Crea tu cuenta gratis en segundos
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                                2
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800">Publica</h3>
                            <p className="text-gray-600">
                                Sube fotos de la ropa que quieres intercambiar
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                                3
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800">Explora</h3>
                            <p className="text-gray-600">
                                Busca prendas que te gusten de otros usuarios
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center">
                            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                                4
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800">Intercambia</h3>
                            <p className="text-gray-600">
                                Contacta y realiza intercambios seguros
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-green-600 text-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="flex justify-center mb-3">
                                <FaUsers className="text-5xl" />
                            </div>
                            <p className="text-4xl font-bold mb-2">1000+</p>
                            <p className="text-green-100">Usuarios Activos</p>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <FaHandshake className="text-5xl" />
                            </div>
                            <p className="text-4xl font-bold mb-2">5000+</p>
                            <p className="text-green-100">Intercambios Realizados</p>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <FaStar className="text-5xl" />
                            </div>
                            <p className="text-4xl font-bold mb-2">4.8</p>
                            <p className="text-green-100">Valoración Promedio</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        ¿Listo para empezar?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Únete a la comunidad EcoSwap y comienza a intercambiar ropa hoy mismo.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                    >
                        Crear Cuenta Gratis
                        <FaArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
