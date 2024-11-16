import React, { useState } from 'react';
import Logo from '../assets/Logo.png'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 md:px-16 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="w-[132px] h-[52px] mr-2" />
                    {/* <span className="text-green-700 font-bold text-lg">FoodIQ</span> */}
                </div>

                {/* Menu for large screens */}
                <div className="hidden md:flex space-x-8">
                    <a href="#" className="text-gray-700 hover:text-green-700 transition-colors duration-300">Home</a>
                    <a href="#" className="text-gray-700 hover:text-green-700 transition-colors duration-300">Feature</a>
                    <a href="#" className="text-gray-700 hover:text-green-700 transition-colors duration-300">Contact</a>
                </div>

                {/* Burger icon for small screens */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Dropdown menu for small screens */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-green-700 transition-colors duration-300">Home</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-green-700 transition-colors duration-300">Feature</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-green-700 transition-colors duration-300">Contact</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
