import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaGithub, FaHeart, FaRecycle } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bg-eco-primary text-white mt-auto">
            <div className="container mx-auto px-4 py-3">
                <p className="text-sm text-center">
                    © 2025 EcoSwap
                </p>
            </div>
        </footer>
    );
};

export default Footer;
