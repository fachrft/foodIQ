import React from "react";
import BackgroundImage from "../assets/your-background-image.png";
import Info from "../Components/Fragments/Info";
import aman from '../assets/aman.svg'
import warning from '../assets/warning.png'

function Home() {
    const fetchData = () => {
        const storedData = JSON.parse(localStorage.getItem("hasilPerhitungan"));
        if (storedData) {
            return storedData;
        } else {
            console.log("Tidak ada data di localStorage.");
            return null;
        }
    };

    const data = fetchData();
    const bmi = data?.hasilBMI;
    const kalori = data?.cetakKalori;

    // Fungsi validasi BMI
    const renderBMIMessage = () => {
        if (bmi < 18.5) {
            return <Info status="danger" image={warning} warning="Berat badan kamu terindikasi (underweight)." kalori={kalori} />;
        } else if (bmi >= 18.5 && bmi <= 22.9) {
            return <Info status="success" image={aman} warning="Berat badan kamu terindikasi (normal)."  kalori={kalori}/>;
        } else if (bmi >= 23 && bmi <= 24.9 ) {
            return <Info status="warning" image={warning} warning="Berat badan kamu terindikasi (overweight)." kalori={kalori}/>;            
        } else if (bmi >= 25 && bmi <= 29.9) {
            return <Info status="danger" image={warning} warning="Berat badan kamu terindikasi (Obesitas)." kalori={kalori} />;
        } else {
            return <Info status="danger" image={warning} warning="Berat badan kamu terindikasi (Obesitas II)." kalori={kalori} />;
        }
    };

    return (
        <div id="home" className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#f0fdf4] pt-20 pb-20">
            {/* Background Gradients/Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-300/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-300/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-yellow-200/20 rounded-full blur-[100px] animate-pulse delay-500"></div>
            </div>

            {/* Content */}
            <div className="z-10 text-center px-4 sm:px-10 max-w-6xl mx-auto flex flex-col items-center">
                <div 
                    className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-green-800 mb-6 border border-white/50 shadow-sm"
                    data-aos="fade-down"
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Asisten Kesehatan Pribadi Anda
                </div>

                <h1 
                    className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Hidup Sehat Bersama <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">FoodIQ</span>
                </h1>
                
                <p 
                    className="text-gray-600 mt-2 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    FoodIQ membantu kebutuhan nutrisi Anda dengan data yang akurat, sehingga Anda dapat menjalani gaya hidup yang lebih sehat dan seimbang.
                </p>

                {/* BMI Info Card Container */}
                <div 
                    className="mt-12 w-full max-w-3xl transform hover:scale-[1.02] transition-transform duration-300"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                >
                    {bmi ? (
                        renderBMIMessage()
                    ) : (
                        <div className="bg-white/50 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-xl text-center">
                            <p className="text-gray-500 text-lg">Data BMI tidak ditemukan. Silakan reset profile dan masukkan data Anda.</p>
                        </div>
                    )}
                </div>

                {/* Additional Info Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Card 1 */}
                    <div 
                        className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-3xl">🥗</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Analisis Makanan</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Temukan informasi nutrisi lengkap dari berbagai jenis makanan untuk membantu Anda membuat pilihan yang lebih cerdas.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div 
                        className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-3xl">📊</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Hitung Kalori</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Dapatkan perhitungan kebutuhan kalori harian yang disesuaikan dengan profil tubuh dan aktivitas Anda.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div 
                        className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-3xl">🍳</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Resep Sehat</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Jelajahi ribuan resep lezat dengan analisis nutrisi lengkap dan panduan langkah demi langkah.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mt-20 w-full max-w-5xl">
                    <h2 
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center"
                        data-aos="fade-up"
                    >
                        Mengapa Memilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">FoodIQ</span>?
                    </h2>
                    <p 
                        className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Kami berkomitmen untuk memberikan informasi nutrisi yang akurat dan mudah dipahami untuk mendukung perjalanan kesehatan Anda.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div 
                            className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 flex gap-4 hover:shadow-lg transition-shadow"
                            data-aos="fade-right"
                            data-aos-delay="100"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-2">Data Akurat & Terpercaya</h4>
                                <p className="text-gray-600 text-sm">
                                    Semua informasi nutrisi bersumber dari database internasional yang terverifikasi dan terus diperbarui.
                                </p>
                            </div>
                        </div>

                        <div 
                            className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 flex gap-4 hover:shadow-lg transition-shadow"
                            data-aos="fade-left"
                            data-aos-delay="100"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-2">Personalisasi Lengkap</h4>
                                <p className="text-gray-600 text-sm">
                                    Dapatkan rekomendasi yang disesuaikan dengan profil, tujuan, dan preferensi kesehatan Anda.
                                </p>
                            </div>
                        </div>

                        <div 
                            className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 flex gap-4 hover:shadow-lg transition-shadow"
                            data-aos="fade-right"
                            data-aos-delay="200"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">📱</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-2">Mudah Digunakan</h4>
                                <p className="text-gray-600 text-sm">
                                    Interface yang intuitif dan responsif memudahkan Anda mengakses informasi kapan saja, di mana saja.
                                </p>
                            </div>
                        </div>

                        <div 
                            className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 flex gap-4 hover:shadow-lg transition-shadow"
                            data-aos="fade-left"
                            data-aos-delay="200"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🆓</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-2">100% Gratis</h4>
                                <p className="text-gray-600 text-sm">
                                    Nikmati semua fitur tanpa biaya berlangganan. Kesehatan adalah hak semua orang.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div 
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
                    data-aos="fade-up"
                >
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/50">
                        <p className="text-4xl font-bold text-green-600 mb-1">1000+</p>
                        <p className="text-gray-600 text-sm font-medium">Resep Tersedia</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/50">
                        <p className="text-4xl font-bold text-orange-600 mb-1">5000+</p>
                        <p className="text-gray-600 text-sm font-medium">Data Makanan</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/50">
                        <p className="text-4xl font-bold text-purple-600 mb-1">100%</p>
                        <p className="text-gray-600 text-sm font-medium">Akurat</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/50">
                        <p className="text-4xl font-bold text-blue-600 mb-1">24/7</p>
                        <p className="text-gray-600 text-sm font-medium">Akses Gratis</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div 
                    className="mt-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 w-full max-w-4xl shadow-2xl shadow-green-900/20"
                    data-aos="zoom-in"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Mulai Perjalanan Sehat Anda Hari Ini
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Dengan FoodIQ, Anda dapat dengan mudah melacak asupan nutrisi, menemukan resep sehat, dan mencapai tujuan kesehatan Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="#feature" 
                            className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg inline-block"
                        >
                            Jelajahi Fitur
                        </a>
                        <a 
                            href="/food" 
                            className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/30 transition-colors border-2 border-white/30 inline-block"
                        >
                            Cari Makanan
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
