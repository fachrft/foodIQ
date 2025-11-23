import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../Pages/Home";
import Feature from "../Pages/Feature";
import Footer from "../Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic',
        });

        // Memeriksa apakah data di localStorage ada
        const data = localStorage.getItem("hasilPerhitungan");

        // Jika data tidak ada, arahkan pengguna ke halaman login atau halaman lain
        if (!data) {
            navigate("/register");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen font-poppins selection:bg-green-200 selection:text-green-900">
            <Navbar />
            <main>
                <Home />
                <Feature />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
