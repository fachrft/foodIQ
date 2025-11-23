import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/Logo.png";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBack = () => {
        localStorage.removeItem("hasilPerhitungan");
        navigate("/register");
    };

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Makanan", path: "/food" },
        { name: "Resep", path: "/recipe" }
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-white/80 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
        }`}>
            <div className="container mx-auto px-4 md:px-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center cursor-pointer">
                    <img src={Logo} alt="FoodIQ Logo" className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" />
                </Link>

                {/* Menu for large screens */}
                <div className="hidden md:flex items-center space-x-8">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.name}
                            to={item.path} 
                            className="text-gray-700 font-medium hover:text-green-600 relative group transition-colors duration-300"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    
                    <button 
                        onClick={handleBack} 
                        className="flex items-center px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2" />
                        <span>Reset Profile</span>
                    </button>
                </div>

                {/* Burger icon for small screens */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="p-2 text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
                    >
                        {isOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl transition-all duration-300 origin-top ${
                isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
            }`}>
                <div className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.name}
                            to={item.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl font-medium transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-gray-100">
                        <button 
                            onClick={handleBack} 
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                        >
                            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2" />
                            Reset Profile
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
