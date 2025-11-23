import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Fragments/Input";
import Option from "../Components/Fragments/Option";
import CurtainOpening from "../Components/Fragments/CurtainOpening";
import axios from 'axios';
import Swal from 'sweetalert2';

function ProfileForm() {
    const navigate = useNavigate();
    const [umur, setUmur] = useState();
    const [tinggi, setTinggi] = useState();
    const [berat, setBerat] = useState();
    const [jenisKelamin, setJenisKelamin] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!umur || !tinggi || !berat || !jenisKelamin) {
            Swal.fire({
                icon: 'warning',
                title: 'Perhatian',
                text: 'Harap isi semua kolom.',
                confirmButtonColor: '#10B981'
            });
            return;
        }
        let hasil = 10 * berat + 6.25 * tinggi - 5 * umur + (jenisKelamin === "Laki-Laki" ? 5 : -161);
        let hasilBMI = berat / ((tinggi / 100) ** 2);
        hasil = Math.floor(hasil);
        const cetakKalori = `Kalori yang anda butuhkan per hari sebanyak ${hasil} Kalori`
    
        try {
            const token = await axios.post('https://food-iq-api.vercel.app/food/get-token')
            // console.log(token)
    
            // Simpan data ke localStorage sebagai JSON
            const data = { cetakKalori, hasilBMI, token: token.data.access_token };
            localStorage.setItem("hasilPerhitungan", JSON.stringify(data));
            
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Hasil perhitungan berhasil disimpan!',
                confirmButtonColor: '#10B981',
                timer: 2000,
                timerProgressBar: true
            });
            navigate("/");
        } catch (error) {
            console.error("Error fetching token:", error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal mengambil token. Silakan coba lagi.',
                confirmButtonColor: '#EF4444'
            });
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f0fdf4] flex items-center justify-center p-4 font-poppins relative overflow-hidden">
            <CurtainOpening />
            
            {/* Background Gradients/Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-300/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-300/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Side - Visual/Info */}
                <div className="w-full md:w-5/12 relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-700 p-8 md:p-12 text-white flex flex-col justify-between">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Welcome to <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">FoodIQ</span>
                        </h1>
                        <p className="text-green-50/80 text-lg leading-relaxed">
                            Start your journey to a healthier lifestyle. Let's calculate your daily needs.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white/40">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Details</h2>
                        <p className="text-gray-500 mb-8">Enter your information to get your personalized plan.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    label="Umur (Tahun)" 
                                    type="number" 
                                    placeholder="25" 
                                    value={umur} 
                                    onChange={(e) => setUmur(e.target.value)}
                                    className="!mb-0"
                                />
                                <Option 
                                    label="Jenis Kelamin" 
                                    options={["Laki-Laki", "Perempuan"]} 
                                    value={jenisKelamin} 
                                    onChange={(e) => setJenisKelamin(e.target.value)}
                                    className="!mb-0"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    label="Tinggi (cm)" 
                                    type="number" 
                                    placeholder="170" 
                                    value={tinggi} 
                                    onChange={(e) => setTinggi(e.target.value)}
                                    className="!mb-0"
                                />
                                <Input 
                                    label="Berat (kg)" 
                                    type="number" 
                                    placeholder="65" 
                                    value={berat} 
                                    onChange={(e) => setBerat(e.target.value)}
                                    className="!mb-0"
                                />
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <span>Calculate Results</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
