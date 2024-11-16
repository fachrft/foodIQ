import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../Pages/Home";
import Feature from "../Pages/Feature";

const Index = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Memeriksa apakah data di localStorage ada
        const data = localStorage.getItem("hasilPerhitungan");

        // Jika data tidak ada, arahkan pengguna ke halaman login atau halaman lain
        if (!data) {
            alert("Anda harus login atau mengisi data profil terlebih dahulu.");
            navigate("/register"); // Ubah '/login' sesuai dengan halaman yang ingin diakses
        }
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <Home />
            <Feature />
        </div>
    );
};

export default Index;
