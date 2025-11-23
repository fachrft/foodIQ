import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden md:px-10">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[60%] bg-green-500 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-50%] left-[-20%] w-[60%] h-[60%] bg-emerald-500 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            FoodIQ
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Platform terpercaya untuk informasi nutrisi dan resep sehat. Wujudkan gaya hidup sehat Anda bersama kami.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors">
                                <span className="text-xl">📘</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors">
                                <span className="text-xl">📸</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors">
                                <span className="text-xl">🐦</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Navigasi Cepat</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> Beranda
                                </a>
                            </li>
                            <li>
                                <a href="/#feature" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> Fitur
                                </a>
                            </li>
                            <li>
                                <a href="/food" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> Cari Makanan
                                </a>
                            </li>
                            <li>
                                <a href="/recipe" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> Resep
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Sumber Daya</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> Panduan Nutrisi
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> Tips Kesehatan
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                                    <span className="text-green-400">→</span> FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Hubungi Kami</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-300">
                                <span className="text-green-400 mt-1">📧</span>
                                <span>info@foodiq.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <span className="text-green-400 mt-1">📱</span>
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <span className="text-green-400 mt-1">📍</span>
                                <span>Jakarta, Indonesia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} FoodIQ. Semua hak dilindungi.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                Syarat & Ketentuan
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                Kontak
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
